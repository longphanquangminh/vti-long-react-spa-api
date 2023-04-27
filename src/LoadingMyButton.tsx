import { useState, useEffect } from "react"
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';

type Props = {
    contentButton: string,
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function LoadingMyButton(props: Props) {
    const handleLoad = (event: React.MouseEvent<HTMLButtonElement>) => {
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
              }, 1000);

              props.onClick(event);
            }
    const [loading, setLoading] = useState(false);

    return (
        <>
            <LoadingButton
          size="small"
          color="secondary"
          onClick={handleLoad}
          loading={loading}
          disabled={loading}
          loadingPosition="start"
          startIcon={<SaveIcon />}
          variant="contained"
        >
          <span>{props.contentButton}</span>
        </LoadingButton>
        </>
    )
}