

export const ProductRating = ({ score }: { score: number }) => {
    const fullStars = Math.floor(score); // 꽉 찬 별 개수
    const halfStar = score % 1 >= 0.5; // 반 별 여부
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0); // 빈 별 개수

    return (
        <div className="flex items-center">
            {/* 꽉 찬 별 */}
            {[...Array(fullStars)].map((_, i) => (
                <svg
                    key={`full-${i}`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="orange"
                    viewBox="0 0 24 24"
                    stroke="oragne"
                    className="w-6 h-6"
                >
                    <path
                        d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                    />
                </svg>
            ))}
            {/* 반 별 */}
            {halfStar && (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="url(#half-gradient)"
                    viewBox="0 0 24 24"
                    stroke="oragne"
                    className="w-6 h-6"
                >
                    <defs>
                        <linearGradient id="half-gradient">
                            <stop offset="50%" stopColor="orange" />
                            <stop offset="50%" stopColor="lightgray" />
                        </linearGradient>
                    </defs>
                    <path
                        d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                    />
                </svg>
            )}
            {/* 빈 별 */}
            {[...Array(emptyStars)].map((_, i) => (
                <svg
                    key={`empty-${i}`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="lightgray"
                    viewBox="0 0 24 24"
                    stroke="lightgray"
                    className="w-5 h-5"
                >
                    <path
                        d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                    />
                </svg>
            ))}
        </div>
    );
}