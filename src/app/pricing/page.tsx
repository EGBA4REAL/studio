import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Check, ArrowRight } from 'lucide-react';
import { Logo } from '@/components/ui/logo';
import Link from 'next/link';
import { signIn } from '@/app/actions';

const tiers = [
    {
        name: 'Daily',
        price: '₦5,000',
        period: '/day',
        features: ['Full Access for 24 Hours', 'AI Tutor', 'Generate Unlimited Quizzes'],
        cta: 'Choose Daily',
    },
    {
        name: 'Weekly',
        price: '₦10,000',
        period: '/week',
        features: ['7 Days Full Access', 'All Daily Features', 'Save materials offline'],
        cta: 'Choose Weekly',
    },
    {
        name: 'Monthly',
        price: '₦20,000',
        period: '/month',
        features: ['Full Month Access', 'All Weekly Features', 'Priority Support'],
        cta: 'Choose Monthly',
        popular: true,
    },
    {
        name: 'Yearly',
        price: '₦240,000',
        period: '/year',
        features: ['Full Year Access', 'All Monthly Features', 'Join Collaborative Chat'],
        cta: 'Choose Yearly',
    },
];

export default function PricingPage() {
    return (
        <div className="flex flex-col min-h-screen bg-background">
            <header className="container mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
                <Logo />
                <div className="flex items-center gap-4">
                    <Button variant="ghost" asChild>
                        <Link href="/">Home</Link>
                    </Button>
                    <form action={signIn}>
                        <Button>Sign In</Button>
                    </form>
                </div>
            </header>

            <main className="flex-grow">
                <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
                    <h1 className="font-headline text-4xl md:text-5xl font-bold">Find a plan to power your learning</h1>
                    <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                        Start for free and upgrade to unlock powerful features that will help you excel in your studies.
                    </p>
                </section>

                <section className="container mx-auto px-4 sm:px-6 lg:px-8 pb-24">
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {tiers.map((tier) => (
                            <Card key={tier.name} className={`flex flex-col ${tier.popular ? 'border-primary shadow-lg' : ''}`}>
                                <CardHeader className="pb-4">
                                    {tier.popular && <div className="text-sm font-bold text-primary text-center mb-2">MOST POPULAR</div>}
                                    <CardTitle className="font-headline text-2xl text-center">{tier.name}</CardTitle>
                                    <div className="flex items-baseline justify-center gap-1">
                                        <span className="text-4xl font-bold">{tier.price}</span>
                                        <span className="text-muted-foreground">{tier.period}</span>
                                    </div>
                                </CardHeader>
                                <CardContent className="flex-grow flex flex-col">
                                    <ul className="space-y-3 mb-8 text-muted-foreground">
                                        {tier.features.map((feature) => (
                                            <li key={feature} className="flex items-center gap-2">
                                                <Check className="w-5 h-5 text-green-500" />
                                                <span>{feature}</span>
                                            </li>

                                        ))}
                                    </ul>
                                    <div className="mt-auto">
                                        <Button className="w-full" variant={tier.popular ? 'default' : 'outline'}>
                                            {tier.cta}
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                     <div className="mt-12 text-center">
                        <p className="mb-4 text-muted-foreground">Ready to just try it out?</p>
                        <form action={signIn}>
                            <Button size="lg" className="group">
                                Start For Free
                                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                            </Button>
                        </form>
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
