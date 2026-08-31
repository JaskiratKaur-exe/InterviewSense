import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import Card, { CardHeader, CardTitle } from '../../../components/ui/Card';

const tips = [
  'Maintain more eye contact with the camera.',
  'Try to reduce filler words such as "um", "uh".',
  'Great pace! Keep it up.',
];

export function TipsCard() {
  return (
    <Card className="border border-slate-100">
      <CardHeader className="mb-2">
        <CardTitle>Tips for You</CardTitle>
      </CardHeader>

      <ul className="space-y-3">
        {tips.map((tip, idx) => (
          <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-600 font-medium leading-relaxed">
            <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
            <span>{tip}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}

export default TipsCard;
