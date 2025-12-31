import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Info } from "lucide-react";

export default function DisclaimerPage() {
    return (
        <div className="container max-w-2xl mx-auto py-16 px-4">
            <div className="bg-background border border-border rounded-lg shadow-sm p-8 md:p-12">
                <div className="flex items-center gap-3 text-destructive mb-6">
                    <AlertTriangle className="h-8 w-8" />
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">Medical Disclaimer</h1>
                </div>

                <div className="prose prose-slate max-w-none text-muted-foreground space-y-4">
                    <p className="font-medium text-foreground">
                        Please read this medical disclaimer carefully before using the CardioGuard Prediction Tool.
                    </p>
                    <p>
                        The content, prediction results, and statistical data provided by this application are for
                        <strong className="text-foreground"> educational and informational purposes only</strong>.
                        This tool does NOT constitute medical advice, diagnosis, or treatment.
                    </p>
                    <p>
                        The prediction model is based on statistical patterns found in a historical dataset.
                        However, individual health conditions vary significantly. A "Low Risk" result does not guarantee
                        good health, and a "High Risk" result is not a definitive diagnosis.
                    </p>

                    <div className="bg-secondary/50 p-4 rounded-md border border-secondary border-l-4 border-l-primary my-6">
                        <div className="flex gap-3">
                            <Info className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                            <p className="text-sm text-foreground">
                                Always seek the advice of your physician or other qualified health provider with any questions
                                you may have regarding a medical condition. Never disregard professional medical advice or
                                delay in seeking it because of something you have read on this website.
                            </p>
                        </div>
                    </div>

                    <p>
                        If you think you may have a medical emergency, call your doctor or emergency services immediately.
                    </p>
                </div>

                <div className="mt-10 flex flex-col sm:flex-row gap-4 pt-6 border-t">
                    <Button asChild size="lg" className="w-full sm:w-auto">
                        <Link href="/predict">I Understand, Start Assessment</Link>
                    </Button>
                    <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
                        <Link href="/">Back to Home</Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}
