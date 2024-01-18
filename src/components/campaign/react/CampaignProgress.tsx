import { useEffect, useState } from 'react';
import type { Tables } from '@config/supabase.types.ts';

type CampaignProgressProps = {
  campaign: Tables<'campaigns'>;
};

const INTERVAL_RATE = 30000;

const CampaignProgress = ({ campaign }: CampaignProgressProps) => {
  const [donors, setDonors] = useState<Tables<'donors'>[]>([]);
  const [amountRaised, setAmountRaised] = useState(0);
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const getData = () => {
      fetch(`/api/campaign/${campaign.id}/donors`)
        .then((response) => response.json())
        .then((data) => {
          setDonors(data);
          const raised = data.reduce(
            (sum: number, donor: Tables<'donors'>) =>
              (sum += donor.amount || 0),
            0
          );
          setAmountRaised(raised);
          const raisedPercentage = Math.ceil(
            (raised / (campaign.goal || 0)) * 100
          );
          setPercent(raisedPercentage);
        })
        .catch((err) => {
          console.log(err.message);
        });
    };

    getData();

    const interval = setInterval(getData, INTERVAL_RATE);
    return () => clearInterval(interval);
  }, [campaign]);

  const daysLeft = Math.floor(Math.random() * 20 + 10);

  return (
    <div className='p-8 flex flex-col gap-8'>
      <div>
        <div className='w-full h-6 bg-gray-200 '>
          <div
            className='h-full bg-green-500 transition-all duration-1000 delay-200'
            style={{ width: `${percent}%` }}
          ></div>
        </div>

        <div className='flex justify-between mt-2'>
          <div className='text-green-500'>
            <p className='text-3xl font-bold'>{amountRaised}$</p>
            <p>Raised</p>
          </div>
          <div className='text-gray-500'>
            <p className='text-3xl font-bold'>{campaign.goal}$</p>
            <p>Goal</p>
          </div>
        </div>
      </div>

      <div className='text-gray-500'>
        <p className='text-3xl font-bold'>{donors.length}</p>
        <p>Contributors</p>
      </div>

      <div className='text-gray-500'>
        <p className='text-3xl font-bold'>{daysLeft}</p>
        <p>Days before end</p>
      </div>
    </div>
  );
};

export default CampaignProgress;
