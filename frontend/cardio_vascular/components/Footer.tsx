import Link from "next/link"

export function Footer() {
    return (
        <footer className="bg-secondary/30 mt-auto border-t">
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
                    <p>© {new Date().getFullYear()} CardioGuard AI. Research Preview.</p>
                    <div className="flex items-center gap-6">
                        <Link href="/disclaimer" className="hover:text-primary transition-colors underline underline-offset-4">
                            Medical Disclaimer
                        </Link>
                        <Link href="/how-to" className="hover:text-primary transition-colors">
                            How It Works
                        </Link>
                    </div>
                </div>
                <div className="mt-4 pt-4 border-t border-border/50 text-xs text-center text-muted-foreground/80 max-w-3xl mx-auto">
                    IMPORTANT: This tool is for educational purposes only and is NOT a substitute for professional medical advice, diagnosis, or treatment. Always consult with a qualified healthcare provider.
                </div>
            </div>
        </footer>
    )
}
