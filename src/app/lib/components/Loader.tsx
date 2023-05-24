export function Loader({ className }: { className: string }) {
    return (
        <div className={`text-theme grid gap-4 py-12 ${className}`}>
            <svg className="animate-spin fill-current h-24 mx-auto" viewBox="0 0 45 45">
                <path
                opacity="0.5"
                d="M22.5 3.75C18.7916 3.75 15.1665 4.84967 12.0831 6.90994C8.99964 8.97022 6.59641 11.8986 5.17727 15.3247C3.75812 18.7508 3.38681 22.5208 4.11028 26.1579C4.83376 29.7951 6.61952 33.136 9.24176 35.7583C11.864 38.3805 15.2049 40.1663 18.8421 40.8897C22.4792 41.6132 26.2492 41.2419 29.6753 39.8227C33.1014 38.4036 36.0298 36.0004 38.0901 32.9169C40.1503 29.8335 41.25 26.2084 41.25 22.5C41.25 20.0377 40.765 17.5995 39.8228 15.3247C38.8805 13.0498 37.4994 10.9828 35.7583 9.24175C34.0172 7.50065 31.9502 6.11953 29.6753 5.17726C27.4005 4.23498 24.9623 3.75 22.5 3.75V3.75ZM22.5 37.5C19.5333 37.5 16.6332 36.6203 14.1665 34.972C11.6997 33.3238 9.77713 30.9811 8.64182 28.2403C7.5065 25.4994 7.20945 22.4834 7.78823 19.5736C8.36701 16.6639 9.79562 13.9912 11.8934 11.8934C13.9912 9.79561 16.6639 8.367 19.5737 7.78822C22.4834 7.20944 25.4994 7.50649 28.2403 8.64181C30.9812 9.77712 33.3238 11.6997 34.9721 14.1664C36.6203 16.6332 37.5 19.5333 37.5 22.5C37.5 26.4782 35.9197 30.2936 33.1066 33.1066C30.2936 35.9196 26.4783 37.5 22.5 37.5V37.5Z"
                />
                <path
                d="M37.5 22.5H41.25C41.25 20.0377 40.765 17.5995 39.8227 15.3247C38.8805 13.0498 37.4994 10.9828 35.7583 9.24175C34.0172 7.50065 31.9502 6.11953 29.6753 5.17726C27.4005 4.23498 24.9623 3.75 22.5 3.75V7.5C26.4782 7.5 30.2936 9.08035 33.1066 11.8934C35.9196 14.7064 37.5 18.5218 37.5 22.5Z"
                />
            </svg>
            <h1 className="mx-auto text-current text-3xl font-bold animate-pulse">Loading...</h1>
        </div>
    )
}