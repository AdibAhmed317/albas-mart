import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const StatisticCard = ({ title, value }) => (
  <Card>
    <CardHeader>
      <CardTitle>{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <p className='text-xl font-robotoBlack md:text-2xl'>{value}</p>
    </CardContent>
  </Card>
);

export default StatisticCard;
