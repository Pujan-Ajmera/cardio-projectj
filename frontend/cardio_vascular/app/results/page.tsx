"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { CheckCircle2, AlertTriangle, ArrowRight, RefreshCcw } from "lucide-react"

export default function ResultsPage() {
    const [result, setResult] = useState<any>(null)

    useEffect(() => {
        // Retrieve result from session storage
        const stored = sessionStorage.getItem("predictionResult")
        if (stored) {
            try {
                setResult(JSON.parse(stored))
            } catch (e) {
                console.error("Failed to parse result")
            }
        }
    }, [])

    if (!result) {
        return (
            <div className="container py-20 text-center">
                <h2 className="text-xl font-medium mb-4">No result found.</h2>
                <p className="text-muted-foreground mb-8">Please complete the assessment first.</p>
                <Button asChild><Link href="/predict">Go to Assessment</Link></Button>
            </div>
        )
    }

    const isHighRisk = result.prediction === 1
    // Mock probability if not provided by backend logic (though backend provided it)
    const probability = result.probability ? (result.probability * 100).toFixed(1) : "N/A"

    return (
        <div className="container max-w-3xl mx-auto py-16 px-4">
            <h1 className="text-3xl font-bold text-center mb-10">Analysis Result</h1>

            <Card className={`border-2 shadow-lg mb-8 ${isHighRisk ? 'border-destructive/50 bg-destructive/5' : 'border-primary/50 bg-primary/5'}`}>
                <CardHeader className="text-center pb-2">
                    <div className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4 ${isHighRisk ? 'bg-destructive/20 text-destructive' : 'bg-primary/20 text-primary'}`}>
                        {isHighRisk ? <AlertTriangle className="w-8 h-8" /> : <CheckCircle2 className="w-8 h-8" />}
                    </div>
                    <CardTitle className={`text-3xl ${isHighRisk ? 'text-destructive' : 'text-primary'}`}>
                        {isHighRisk ? "High Risk Detected" : "Low Risk Detected"}
                    </CardTitle>
                    <CardDescription className="text-lg mt-2">
                        Based on the provided metrics
                    </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                    <div className="text-5xl font-extrabold my-6 tracking-tight text-foreground">
                        {probability}%
                        <span className="text-lg font-medium text-muted-foreground block mt-2">Probability Score</span>
                    </div>
                    <p className="text-muted-foreground max-w-lg mx-auto mb-6">
                        {isHighRisk
                            ? "The model has identified patterns consistent with cardiovascular disease risk. We strongly recommend consulting a healthcare professional for a thorough check-up."
                            : "The model indicates a lower probability of cardiovascular disease based on standard markers. Maintain a healthy lifestyle and continue regular check-ups."
                        }
                    </p>
                </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-4">
                <Button asChild size="lg" variant="outline" className="w-full">
                    <Link href="/stats">View Model Statistics</Link>
                </Button>
                <Button asChild size="lg" className="w-full">
                    <Link href="/predict">
                        <RefreshCcw className="mr-2 h-4 w-4" /> Start New Assessment
                    </Link>
                </Button>
            </div>

            <div className="mt-8 text-center text-sm text-muted-foreground p-4 bg-muted/50 rounded-lg">
                * This result is an algorithmic estimation and NOT a medical diagnosis.
            </div>
        </div>
    )
}
