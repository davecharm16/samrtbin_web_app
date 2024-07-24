export const fillColumnsData = [
    { field: 'id', headerName: 'ID', minWidth: 100, flex: 1 },
    { field: 'bin', headerName: 'Bin', minWidth: 150, flex: 1 },
    { field: 'bin_type', headerName: 'Bin Type', minWidth: 100, flex: 1 },
    {
        field: 'percentage',
        headerName: 'Percentage',
        type: 'number',
        minWidth: 100,
        flex: 1,
    },
    {
        field: 'timestamp',
        headerName: 'Date and Time',
        minWidth: 200,
        flex: 1,
        renderCell: (params) => {
            if (!params.row.timestamp) return '';
            const date = params.row.timestamp.toDate();
            return date.toLocaleString(undefined, {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
            });
        },
    },
];
