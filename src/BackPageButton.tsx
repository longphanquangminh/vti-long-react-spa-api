import { Link, useLocation } from 'react-router-dom';
import Button from '@mui/joy/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';

type Props = {
    id: string | undefined,
}

export default function BackPageButton(props: Props) {
    const location = useLocation();
    const linkChange = props.id != "999" ? `/users/${props.id}` : `/my-profile`;
    return (
        <Link to={`${location.pathname.includes('posts') || location.pathname.includes('todos') ? linkChange : `/`}`}>
            <Button className={`${location.pathname.includes('users') || location.pathname.includes('my-profile') ? "" : "invisible"}`} variant="soft" startDecorator={<KeyboardArrowLeft />}>
                {location.pathname.includes('posts') || location.pathname.includes('todos') ? "User Detail" : "Home Page"}
            </Button>
        </Link>
    )
}