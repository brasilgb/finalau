export default function AppLoading() {
    return (
        <div className="fixed top-0 left-0 w-full h-full bg-background/10 z-50 flex items-center justify-center">
            <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        </div>
    )
}
