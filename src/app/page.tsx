import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, BookOpen, BrainCircuit, Target } from 'lucide-react';
import { Logo } from '@/components/ui/logo';
import Link from 'next/link';
import { signIn } from '@/app/actions';
import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function LandingPage() {
  const session = await getSession();
  if (session) {
    redirect('/dashboard');
  }

  const features = [
    {
      icon: <BookOpen className="w-8 h-8 text-primary" />,
      title: 'Comprehensive Curriculum',
      description:
        'Access a full range of subjects and topics based on the official Nigerian curriculum for all levels.',
    },
    {
      icon: <BrainCircuit className="w-8 h-8 text-primary" />,
      title: 'AI-Powered Quizzes',
      description:
        'Reinforce learning with dynamically generated quizzes tailored to each lesson plan.',
    },
    {
      icon: <Target className="w-8 h-8 text-primary" />,
      title: 'Progress Tracking',
      description:
        'Monitor your learning journey, track quiz scores, and stay motivated to achieve your goals.',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <header className="container mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <Logo />
        <form action={signIn}>
          <Button>Sign In & Start Learning</Button>
        </form>
      </header>

      <main className="flex-grow">
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="font-headline text-4xl md:text-6xl font-bold text-gray-900 dark:text-white">
              Unlock Your Potential with{' '}
              <span className="text-primary">NaijaLearn</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-gray-600 dark:text-gray-300">
              Your gateway to the Nigerian curriculum, made interactive and
              accessible. Learn, practice, and excel from anywhere.
            </p>
            <form action={signIn} className="mt-8">
              <Button size="lg" className="group">
                Get Started for Free
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </form>
          </div>
        </section>

        <section className="bg-white/70 dark:bg-gray-800/20 py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <Card
                  key={index}
                  className="bg-background/50 border-0 shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <div className="p-4 bg-primary/10 rounded-full mb-4">
                      {feature.icon}
                    </div>
                    <h3 className="font-headline text-xl font-semibold mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <div className="md:w-1/2">
              <Image
                src="https://picsum.photos/seed/learn/600/400"
                data-ai-hint="happy student"
                alt="Student learning with NaijaLearn"
                width={600}
                height={400}
                className="rounded-lg shadow-2xl"
              />
            </div>
            <div className="md:w-1/2 text-center md:text-left">
              <h2 className="font-headline text-3xl md:text-4xl font-bold mb-4">
                Learn at Your Own Pace
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                NaijaLearn provides a flexible platform to explore topics,
                revisit lessons, and test your knowledge whenever you want. Our
                structured content helps you stay on track with the school year.
              </p>
              <Button asChild size="lg" variant="outline">
                <Link href="/dashboard">Explore Curriculum</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-card py-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} NaijaLearn. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
