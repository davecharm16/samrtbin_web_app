export default function Button({ text, icon, type, variant, onClick, loading, disabled }) {
    let variantClass;

    switch (variant) {
        case 'primary':
            variantClass = 'btn-primary';
            break;
        case 'secondary':
            variantClass = 'btn-secondary';
            break;
        case 'success':
            variantClass = 'btn-success';
            break;
        case 'danger':
            variantClass = 'btn-error';
            break;
        default:
            variantClass = 'btn-primary';
    }

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={loading ? loading : disabled}
            className={`btn ${variantClass} flex flex-row gap-2 text-white`}
        >
            {loading ? (
                <span className="loading loading-spinner loading-md"></span>
            ) : (
                <>
                    {icon}
                    {text}
                </>
            )}
        </button>
    );
}
