import { cn } from '@/lib/utils';
import { GraduationCap } from 'lucide-react';
import Link from 'next/link';

type LogoProps = {
  className?: string;
};

export function Logo({ className }: LogoProps) {
  return (
    <Link
      href="/dashboard"
      className={cn(
        'flex items-center gap-2 text-xl font-bold font-headline text-foreground',
        className
      )}
    >
      <div className="p-2 bg-primary rounded-lg">
        <GraduationCap className="w-5 h-5 text-primary-foreground" />
      </div>
      <span>NaijaLearn</span>
    </Link>
  );
}
