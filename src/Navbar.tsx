import * as React from 'react';
import LoadingBar from 'react-top-loading-bar';
import axios from 'axios'
import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { RemoveScrollBar } from 'react-remove-scroll-bar';
import RowCard from './UserSearchCard';

const pages = ['Search'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
const settings_not_login = ['Login', 'Sign up'];
const settings_link = ['/my-profile', 'https://github.com/longphanquangminh', '/', '/'];

interface Data {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    avatar: string;
    // Add more properties as needed
}

const fetchData = async (page: number): Promise<Data[]> => {
    const response = await axios.get(`https://reqres.in/api/users?page=${page}`);
    return response.data.data;
};

function ResponsiveAppBar() {
    const [data, setData] = useState<Data[]>([])
    const [loggedIn,setLoggedIn] = useState(true)
    const [progress, setProgress] = useState(0)
    const [searchData, setSearchData] = useState<Data[]>([])
    const [searchLetters, setSearchLetters] = useState('')
    const location = useLocation()
    useEffect(() => {
        const getData = async () => {
            let page = 1;
            let allData: Data[] = [];

            while (true) {
                const newData = await fetchData(page);

                if (newData.length === 0) {
                    // No more data available
                    break;
                }

                allData = [...allData, ...newData];
                page++;
            }
            allData = [...allData, {
                "id": 999,
                "email": "phanquangminhlong@gmail.com",
                "first_name": "Long",
                "last_name": "Phan",
                "avatar": "https://avatars.githubusercontent.com/u/111166256"
              }]
            setData(allData);
        };

        getData();
    }, []);
    // useEffect(() => {
    //     setSearchData(data.filter((item: any) =>
    //                 item.first_name?.toLowerCase().includes(searchLetters.toLowerCase()) ||
    //                 item.email?.toLowerCase().includes(searchLetters.toLowerCase()) ||
    //                 item.last_name?.toLowerCase().includes(searchLetters.toLowerCase())
    //             ))
    // }, [searchLetters])

    useEffect(() => {
        setProgress(0); // Reset the progress value
        setSearchData([]);
    
        const filteredData = data.filter((item: any) =>
            (item.first_name + " " + item.last_name)?.toLowerCase().includes(searchLetters.toLowerCase()) ||
            item.email?.toLowerCase().includes(searchLetters.toLowerCase())
        );
    
        const totalItems = filteredData.length;
        let processedItems = 0;
    
        filteredData.forEach((item, index) => {
            setSearchData(prevResults => [...prevResults, item]);
            if(searchLetters != '') {
                processedItems++;
            const progressValue = Math.round((processedItems / totalItems) * 100);
            setProgress(progressValue);
            }
        });
      }, [searchLetters]);

    const [showSearchBar, setShowSearchBar] = useState(false);
    const [openUserSettings, setOpenUserSettings] = useState(true);
    const modalRef = useRef<HTMLDivElement>(null)
    const modalRef2 = useRef<HTMLDivElement>(null)
    const handleClickOutside = (e: MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(e.target as Node))
            setShowSearchBar(false)
    };

    useEffect(() => {
        document.addEventListener('mouseup', handleClickOutside);

        return () => {
            document.removeEventListener('mouseup', handleClickOutside);
        }
    }, [])
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
        setOpenUserSettings(true);
    };

    const handleCloseNavMenu = () => {
        setShowSearchBar(!showSearchBar);
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
        setOpenUserSettings(false);
    };

    return (<>
        <LoadingBar
            color={'indigo'}
            height={5}
            progress={progress}
            onLoaderFinished={() => setProgress(0)}
        />
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        <Link to="/">MLUMS</Link>
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page} onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center">{page}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href=""
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        MLUMS
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <Button
                                key={page}
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                {page}
                            </Button>
                        ))}
                        <Link to={"/news"}>
                        <Button
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            NEWSFEED
                        </Button>
                        </Link>
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="Remy Sharp" src={loggedIn ? "https://avatars.githubusercontent.com/u/111166256" : ""} />
                            </IconButton>
                        </Tooltip>
                        <Menu
                        className={openUserSettings ? "" : "hidden"}
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {loggedIn && settings.map((setting, index) => (
                                (<Link onClick={settings[index] == "Logout" ? () => {setLoggedIn(false)} : () => {}} target={`${settings_link[index].includes("http") ? "_blank" : ""}`} to={settings_link[index]}>
                                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                        <Typography textAlign="center">{setting}</Typography>
                                    </MenuItem>
                                </Link>)
                            ))}
                            {!loggedIn && settings_not_login.map((setting) => (
                                (<Link onClick={() => setLoggedIn(true)} to="/">
                                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                        <Typography textAlign="center">{setting}</Typography>
                                    </MenuItem>
                                </Link>)
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar >
        {showSearchBar && (
            <>
                <div className="absolute top-[68px] left-0 z-50 h-screen w-screen bg-black p-6 opacity-60"></div>
                <div ref={modalRef} className="absolute top-[68px] left-0 z-50 w-screen bg-white p-6 text-neutral-600">
                    <RemoveScrollBar />
                    <div className="mx-5 flex justify-between">
                        <div className="text-1xl grid w-full content-center font-light">
                            <div className="flex justify-between">
                                <img
                                    className="my-auto h-3"
                                    src="https://cdn-icons-png.flaticon.com/512/54/54481.png"
                                    alt=""
                                />
                                <div className="mx-5 w-full">
                                    <form className="w-full">
                                        <div className="flex items-center py-2">
                                            <input
                                                autoFocus
                                                value={searchLetters}
                                                onChange={e => {
                                                    setSearchLetters(e.target.value);
                                                }}
                                                className="mr-3 w-full appearance-none border-none bg-transparent py-1 px-2 leading-tight text-gray-700 focus:outline-none"
                                                type="text"
                                                placeholder="Search user..."
                                                aria-label="Search product(s)"
                                            />
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <img
                            onClick={() => {
                                setShowSearchBar(false);
                            }}
                            className="my-auto h-3 hover:cursor-pointer"
                            src="https://cdn-icons-png.flaticon.com/512/2961/2961937.png"
                            alt=""
                        />
                    </div>
                    {searchLetters && (
                        <div className="">
                            <div className="mb-5 border-b-[2px] border-indigo-500 pb-2">
                                <div className="flex justify-between">
                                    {searchData.length > 0 ? <p>{searchData.length} results</p> : <p>Users</p>}
                                    {searchData.length > 0 ? (
                                        <Link
                                            to={`/search/${searchLetters}`}
                                            className="cursor-pointer hover:underline"
                                            onClick={() => setShowSearchBar(false)}
                                        >
                                            View all
                                        </Link>
                                    ) : (
                                        <></>
                                    )}
                                </div>
                            </div>
                            <div className="overflow-y-auto h-96">
                            {searchData.length > 0 ? (
                                searchData.slice(0, 4).map((item: any, index) => {
                                    return (<Link className='grid m-5 hover:text-blue-800' onClick={() => { setShowSearchBar(false); setSearchLetters('') }} to={item.id == 999 ? `/my-profile` : `/users/${item.id}`}>
                                        <RowCard
                                            userSearchId={item.id}
                                            userSearchAvatar={item.avatar}
                                            userSearchFirstName={item.first_name}
                                            userSearchLastName={item.last_name}
                                            userSearchEmail={item.email}
                                        />
                                    </Link>)
                                })
                            ) : (
                                <p>No results could be found</p>
                            )}
                            </div>
                        </div>
                    )}
                </div>
            </>
        )
        }
    </>
    );
}
export default ResponsiveAppBar;