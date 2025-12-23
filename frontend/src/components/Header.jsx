const Header = () => {
    return (
        <header className="bg-black/30 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
            <div className="container mx-auto px-4 py-6 max-w-7xl">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-11 h-11 bg-linear-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                            <span className="text-white text-xl font-bold">{'</>'}</span>
                        </div>
                        <h1 className='text-3xl font-bold bg-linear-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent'>
                            Code Explainer
                        </h1>
                    </div>

                </div>
            </div>
        </header>
    );
};

export default Header;