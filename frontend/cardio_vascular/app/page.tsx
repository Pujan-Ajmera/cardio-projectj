import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShieldCheck, Activity, BrainCircuit } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center py-20 px-4 text-center bg-gradient-to-b from-primary/5 to-background">
        <div className="max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
            <ShieldCheck className="w-4 h-4" />
            <span>Trusted AI Medical Research Tool</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground">
            Early Detection <br />
            <span className="text-primary">Saves Lives</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Assess your cardiovascular health risk instantly using our advanced machine learning model. Accurate, private, and designed for medical insight.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="h-12 px-8 text-lg rounded-full shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all">
              <Link href="/predict">
                Start Assessment <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-12 px-8 text-lg rounded-full">
              <Link href="/how-to">How it Works</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-background p-8 rounded-2xl shadow-sm border border-border/50 hover:shadow-md transition-shadow">
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6">
                <BrainCircuit className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">XGBoost ML Engine</h3>
              <p className="text-muted-foreground">
                Powered by a high-accuracy eXtreme Gradient Boosting model trained on thousands of validated clinical records.
              </p>
            </div>

            <div className="bg-background p-8 rounded-2xl shadow-sm border border-border/50 hover:shadow-md transition-shadow">
              <div className="h-12 w-12 rounded-xl bg-secondary text-primary flex items-center justify-center mb-6">
                <Activity className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Instant Analysis</h3>
              <p className="text-muted-foreground">
                Get immediate results with a detailed breakdown of risk factors and probability scores.
              </p>
            </div>

            <div className="bg-background p-8 rounded-2xl shadow-sm border border-border/50 hover:shadow-md transition-shadow">
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Medical Privacy</h3>
              <p className="text-muted-foreground">
                Data is processed securely. No personal identifiable information is stored or shared.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
