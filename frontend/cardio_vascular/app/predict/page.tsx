"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Loader2, Activity, HeartPulse, Scale, AlertCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// Zod Schema
const formSchema = z.object({
    age: z.coerce.number().min(20, "Age must be at least 20").max(80, "Age must be under 80"),
    gender: z.coerce.number().int(), // 1: Female, 2: Male
    height: z.coerce.number().min(50, "Height must be realistic (min 50cm)").max(250, "Height at most 250cm"),
    weight: z.coerce.number().min(10, "Weight must be realistic").max(250, "Weight at most 250kg"),
    ap_hi: z.coerce.number().min(50, "Systolic BP too low").max(250, "Systolic BP too high (max 250)"),
    ap_lo: z.coerce.number().min(30, "Diastolic BP too low").max(150, "Diastolic BP too high (max 150)"),
    cholesterol: z.coerce.number().int(),
    gluc: z.coerce.number().int(),
    smoke: z.coerce.number().int(),
    alco: z.coerce.number().int(),
    active: z.coerce.number().int(),
}).refine((data) => data.ap_hi > data.ap_lo, {
    message: "Systolic BP must be higher than Diastolic BP",
    path: ["ap_lo"],
});

type FormValues = z.infer<typeof formSchema>

export default function PredictPage() {
    const router = useRouter()
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)

    // Using any for resolver to avoid version mismatch issues between zod and hookform/resolvers
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema) as any,
        defaultValues: {
            gender: 1,
            smoke: 0,
            alco: 0,
            active: 1,
            cholesterol: 1,
            gluc: 1,
        },
    })

    async function onSubmit(values: FormValues) {
        setLoading(true)
        setError(null)

        try {
            const response = await fetch("https://cardio-project-r62i.onrender.com/predict", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
            })

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}))
                throw new Error(errorData.detail || "Failed to connect to prediction service.")
            }

            const data = await response.json()

            // Store result in session storage for the results page
            sessionStorage.setItem("predictionResult", JSON.stringify(data))
            router.push("/results")
        } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : "An unexpected error occurred. Please try again."
            setError(errorMessage)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="container max-w-4xl mx-auto py-12 px-4">
            <div className="mb-8 text-center">
                <h1 className="text-3xl font-bold tracking-tight mb-2">Cardiovascular Risk Assessment</h1>
                <p className="text-muted-foreground">Please fill in all medical data accurately for the most precise result.</p>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                    {error && (
                        <Alert variant="destructive">
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>Error</AlertTitle>
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}

                    {/* Group 1: Personal Info */}
                    <Card>
                        <CardHeader className="bg-secondary/20 pb-4">
                            <div className="flex items-center gap-2">
                                <div className="bg-primary/10 p-2 rounded-full"><Activity className="w-5 h-5 text-primary" /></div>
                                <CardTitle className="text-lg">Personal Details</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent className="grid md:grid-cols-2 gap-6 pt-6">
                            <FormField
                                control={form.control}
                                name="age"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Age (Years)</FormLabel>
                                        <FormControl>
                                            <Input type="number" placeholder="e.g. 45" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="gender"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Gender</FormLabel>
                                        <Select
                                            onValueChange={(val) => field.onChange(parseInt(val))}
                                            value={field.value?.toString()}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select gender" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="1">Female</SelectItem>
                                                <SelectItem value="2">Male</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="height"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Height (cm)</FormLabel>
                                        <FormControl>
                                            <Input type="number" placeholder="e.g. 170" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="weight"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Weight (kg)</FormLabel>
                                        <FormControl>
                                            <Input type="number" placeholder="e.g. 70" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                    </Card>

                    {/* Group 2: Vitals */}
                    <Card>
                        <CardHeader className="bg-secondary/20 pb-4">
                            <div className="flex items-center gap-2">
                                <div className="bg-primary/10 p-2 rounded-full"><HeartPulse className="w-5 h-5 text-primary" /></div>
                                <CardTitle className="text-lg">Vitals & Tests</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent className="grid md:grid-cols-2 gap-6 pt-6">
                            <FormField
                                control={form.control}
                                name="ap_hi"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Systolic Blood Pressure (ap_hi)</FormLabel>
                                        <FormControl>
                                            <Input type="number" placeholder="120" {...field} />
                                        </FormControl>
                                        <FormDescription>Top number (mm Hg)</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="ap_lo"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Diastolic Blood Pressure (ap_lo)</FormLabel>
                                        <FormControl>
                                            <Input type="number" placeholder="80" {...field} />
                                        </FormControl>
                                        <FormDescription>Bottom number (mm Hg)</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="cholesterol"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Cholesterol</FormLabel>
                                        <Select
                                            onValueChange={(val) => field.onChange(parseInt(val))}
                                            value={field.value?.toString()}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select level" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="1">1: Normal</SelectItem>
                                                <SelectItem value="2">2: Above Normal</SelectItem>
                                                <SelectItem value="3">3: Well Above Normal</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="gluc"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Glucose</FormLabel>
                                        <Select
                                            onValueChange={(val) => field.onChange(parseInt(val))}
                                            value={field.value?.toString()}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select level" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="1">1: Normal</SelectItem>
                                                <SelectItem value="2">2: Above Normal</SelectItem>
                                                <SelectItem value="3">3: Well Above Normal</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                    </Card>

                    {/* Group 3: Lifestyle */}
                    <Card>
                        <CardHeader className="bg-secondary/20 pb-4">
                            <div className="flex items-center gap-2">
                                <div className="bg-primary/10 p-2 rounded-full"><Scale className="w-5 h-5 text-primary" /></div>
                                <CardTitle className="text-lg">Lifestyle</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent className="grid md:grid-cols-3 gap-6 pt-6">
                            <FormField
                                control={form.control}
                                name="smoke"
                                render={({ field }) => (
                                    <FormItem className="space-y-3">
                                        <FormLabel>Smoking?</FormLabel>
                                        <FormControl>
                                            <RadioGroup
                                                onValueChange={(val) => field.onChange(parseInt(val))}
                                                value={field.value?.toString()}
                                                className="flex flex-col space-y-1"
                                            >
                                                <FormItem className="flex items-center space-x-3 space-y-0">
                                                    <FormControl>
                                                        <RadioGroupItem value="0" />
                                                    </FormControl>
                                                    <FormLabel className="font-normal">No</FormLabel>
                                                </FormItem>
                                                <FormItem className="flex items-center space-x-3 space-y-0">
                                                    <FormControl>
                                                        <RadioGroupItem value="1" />
                                                    </FormControl>
                                                    <FormLabel className="font-normal">Yes</FormLabel>
                                                </FormItem>
                                            </RadioGroup>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="alco"
                                render={({ field }) => (
                                    <FormItem className="space-y-3">
                                        <FormLabel>Alcohol Intake?</FormLabel>
                                        <FormControl>
                                            <RadioGroup
                                                onValueChange={(val) => field.onChange(parseInt(val))}
                                                value={field.value?.toString()}
                                                className="flex flex-col space-y-1"
                                            >
                                                <FormItem className="flex items-center space-x-3 space-y-0">
                                                    <FormControl>
                                                        <RadioGroupItem value="0" />
                                                    </FormControl>
                                                    <FormLabel className="font-normal">No</FormLabel>
                                                </FormItem>
                                                <FormItem className="flex items-center space-x-3 space-y-0">
                                                    <FormControl>
                                                        <RadioGroupItem value="1" />
                                                    </FormControl>
                                                    <FormLabel className="font-normal">Yes</FormLabel>
                                                </FormItem>
                                            </RadioGroup>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="active"
                                render={({ field }) => (
                                    <FormItem className="space-y-3">
                                        <FormLabel>Physically Active?</FormLabel>
                                        <FormControl>
                                            <RadioGroup
                                                onValueChange={(val) => field.onChange(parseInt(val))}
                                                value={field.value?.toString()}
                                                className="flex flex-col space-y-1"
                                            >
                                                <FormItem className="flex items-center space-x-3 space-y-0">
                                                    <FormControl>
                                                        <RadioGroupItem value="0" />
                                                    </FormControl>
                                                    <FormLabel className="font-normal">No</FormLabel>
                                                </FormItem>
                                                <FormItem className="flex items-center space-x-3 space-y-0">
                                                    <FormControl>
                                                        <RadioGroupItem value="1" />
                                                    </FormControl>
                                                    <FormLabel className="font-normal">Yes</FormLabel>
                                                </FormItem>
                                            </RadioGroup>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                    </Card>

                    <Button type="submit" size="lg" className="w-full text-lg h-12" disabled={loading}>
                        {loading ? <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Analyzing...</> : "Analyze Risk"}
                    </Button>

                </form>
            </Form>
        </div>
    )
}


