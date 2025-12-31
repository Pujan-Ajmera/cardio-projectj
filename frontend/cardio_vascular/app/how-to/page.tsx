import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, FileText, Activity } from "lucide-react";

export default function HowToPage() {
    return (
        <div className="container max-w-4xl mx-auto py-16 px-4">
            <div className="space-y-4 mb-12 text-center md:text-left">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">How to Use CardioGuard</h1>
                <p className="text-lg text-muted-foreground max-w-2xl">
                    Follow these simple steps to perform a cardiovascular risk assessment. Please ensure you have your recent medical data ready for accurate results.
                </p>
            </div>

            <div className="grid gap-12 relative before:hidden md:before:block before:absolute before:left-[19px] before:top-4 before:bottom-4 before:w-0.5 before:bg-border">

                {/* Step 1 */}
                <div className="relative pl-0 md:pl-12">
                    <div className="md:absolute left-0 top-1 w-10 h-10 bg-primary/10 text-primary rounded-full flex items-center justify-center font-bold border-4 border-background z-10 mb-4 md:mb-0">
                        1
                    </div>
                    <div className="bg-card border rounded-xl p-6 shadow-sm">
                        <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                            <FileText className="w-5 h-5 text-secondary-foreground" />
                            Gather Your Data
                        </h3>
                        <p className="text-muted-foreground mb-4">
                            You will need specific measurements. Standard ranges are provided for reference:
                        </p>
                        <ul className="grid sm:grid-cols-2 gap-x-4 gap-y-2 text-sm text-foreground/80">
                            <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary" /> Age (Years)</li>
                            <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary" /> Height (cm) & Weight (kg)</li>
                            <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary" /> Systolic BP (ap_hi)</li>
                            <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary" /> Diastolic BP (ap_lo)</li>
                            <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary" /> Cholesterol Level</li>
                            <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary" /> Glucose Level</li>
                        </ul>
                    </div>
                </div>

                {/* Step 2 */}
                <div className="relative pl-0 md:pl-12">
                    <div className="md:absolute left-0 top-1 w-10 h-10 bg-primary/10 text-primary rounded-full flex items-center justify-center font-bold border-4 border-background z-10 mb-4 md:mb-0">
                        2
                    </div>
                    <div className="bg-card border rounded-xl p-6 shadow-sm">
                        <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                            <Activity className="w-5 h-5 text-secondary-foreground" />
                            Enter Information
                        </h3>
                        <p className="text-muted-foreground">
                            Navigate to the <Link href="/predict" className="text-primary hover:underline font-medium">Prediction Page</Link>.
                            Fill out the medical form carefully. The form uses instant validation logic to ensure your values are within medically possible ranges (e.g., Blood Pressure 50-250 mmHg).
                        </p>
                    </div>
                </div>

                {/* Step 3 */}
                <div className="relative pl-0 md:pl-12">
                    <div className="md:absolute left-0 top-1 w-10 h-10 bg-primary/10 text-primary rounded-full flex items-center justify-center font-bold border-4 border-background z-10 mb-4 md:mb-0">
                        3
                    </div>
                    <div className="bg-card border rounded-xl p-6 shadow-sm">
                        <h3 className="text-xl font-semibold mb-3">View Results</h3>
                        <p className="text-muted-foreground mb-4">
                            Click "Analyze Risk". Our XGBoost model will process your data securely.
                        </p>
                        <div className="bg-secondary/40 p-4 rounded-lg text-sm">
                            <p className="font-medium text-foreground">You will receive:</p>
                            <ul className="list-disc list-inside mt-2 space-y-1 text-muted-foreground">
                                <li>Binary Classification (Risk / No Risk)</li>
                                <li>Probability Percentage</li>
                                <li>Actionable Next Steps</li>
                            </ul>
                        </div>
                    </div>
                </div>

            </div>

            <div className="mt-16 flex justify-center">
                <Button asChild size="lg" className="px-8 h-12 text-lg rounded-full">
                    <Link href="/predict">
                        Start Assessment <ArrowRight className="ml-2 w-5 h-5" />
                    </Link>
                </Button>
            </div>
        </div>
    );
}
