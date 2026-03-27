export function Logo({ size = 24, className = "" }: { size?: number, className?: string }) {
    return (
        <svg 
            width={size} 
            height={size} 
            viewBox="0 0 24 24" 
            fill="none" 
            className={className}
            xmlns="http://www.w3.org/2000/svg"
        >
            <defs>
                <linearGradient id="logo-gradient-comp" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#4f46e5', stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: '#7c3aed', stopOpacity: 1 }} />
                </linearGradient>
            </defs>
            <path d="M2 9V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v4" fill="url(#logo-gradient-comp)" />
            <path d="M2 15v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4" fill="url(#logo-gradient-comp)" />
            <path d="M22 9a2 2 0 0 1 0 6H22Z" fill="url(#logo-gradient-comp)" />
            <path d="M2 9a2 2 0 0 0 0 6H2Z" fill="url(#logo-gradient-comp)" />
            <rect x="2" y="9" width="20" height="6" fill="url(#logo-gradient-comp)" />
            <path d="M13 7l-4 5h3l-1 5 4-5h-3l1-5z" fill="white" />
        </svg>
    );
}
