import BackPageButton from "./BackPageButton";
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import axios from 'axios';
import { RemoveScrollBar } from 'react-remove-scroll-bar';
import Loading from './Loading';
import ResponsiveAppBar from './Navbar';


function Header() {
  const [changeNavbarColor, setChangeNavbarColor] = useState(false);
  const [customerNote, setCustomerNote] = useState('');
  const [hoverNavbar, setHoverNavbar] = useState(false);
  const [scrollPercentageChange, setScrollPercentageChange] = useState(0);
  const [showCart, setShowCart] = useState(false);
  const [showNote, setShowNote] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [zoom, setZoom] = useState(
    Math.round((window.devicePixelRatio / 1.25) * 100),
  );
  const [searchLetters, setSearchLetters] = useState('');
  const handleZoom = () => {
    function onChange() {
      setZoom(Math.round((window.devicePixelRatio / 1.25) * 100));
    }
    matchMedia(`(resolution: ${window.devicePixelRatio}dppx)`).addEventListener(
      'change',
      onChange,
      { once: true },
    );
  };
  handleZoom();
  const handleSearchShow = () => {
    setShowSearchBar(!showSearchBar);
    setChangeNavbarColor(true);
  };
  useEffect(() => {
    const h = document.documentElement,
      b = document.body,
      st = 'scrollTop',
      sh = 'scrollHeight';

    const handleScroll = () => {
      setScrollPercentageChange(
        ((h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight)) * 100,
      );
      if (window.scrollY >= 20) {
        setChangeNavbarColor(true);
      } else {
        setChangeNavbarColor(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    // window.addEventListener('mouseover', handleHover)

    return () => {
      window.removeEventListener('scroll', handleScroll);
      // window.removeEventListener('mouseover', handleHover)
    };
  }, []);

  // This function will scroll the window to the top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // for smoothly scrolling
    });
  };

  const cartItems = 99;

  const baseURL = 'http://localhost:5500/src/static/data/productsData.json';
  const [showMenu, setShowMenu] = useState(false);
  const [post, setPost] = useState<any>();
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    axios
      .get(baseURL, {
        onDownloadProgress: progressEvent => {
          if (progressEvent.total && progressEvent.loaded) {
            setProgress(
              Math.round((progressEvent.loaded * 100) / progressEvent.total),
            );
          }
        },
      })
      .then(response => {
        setPost(response.data);
      });
  }, []);

  const products = post;
  const listItems = products ? (
    <div className="grid h-72 grid-cols-1 overflow-y-auto md:grid-cols-2 lg:grid-cols-4">
      s
    </div>
  ) : (
    <Loading />
  );

  return (
    <>
      <div className="fixed z-50 w-screen">
        <ResponsiveAppBar />
      </div>
      {/* <div className="fixed top-20 left-5 z-50">
            <BackPageButton />
        </div> */}
      {changeNavbarColor && (
        <button
          title="button"
          className="fixed bottom-5 right-5 z-30 h-12 w-12 rounded-full bg-gray-500 text-white hover:bg-gray-400"
          onClick={scrollToTop}
        >
          <CircularProgressbarWithChildren value={scrollPercentageChange}>
            <img
              alt=""
              src="https://cdn-icons-png.flaticon.com/512/608/608336.png"
              className="mx-auto flex h-5 grayscale invert"
            />
          </CircularProgressbarWithChildren>
        </button>
      )}
      {showMenu && (
        <>
          <div
            onClick={() => setShowMenu(false)}
            className="fixed left-0 top-0 z-40 h-screen w-[100%] bg-black opacity-60"
          ></div>
          <div className="fixed left-0 top-0 z-50 h-screen w-[50%] bg-white">
            <RemoveScrollBar />
            <div className="mx-5 mb-5 flex h-16">
              <img
                onClick={() => setShowMenu(false)}
                className="my-auto h-3 hover:cursor-pointer"
                src="https://cdn-icons-png.flaticon.com/512/2961/2961937.png"
                alt=""
              />
            </div>
            <div className="mx-5">
              <ul>
                <li>SHOP</li>
                <li>KITS</li>
                <li>TECH</li>
                <li>EXPLORE</li>
                <li>ACCOUNT</li>
              </ul>
            </div>
          </div>
        </>
      )}
      {showCart && (
        <>
          <div
            onClick={() => {
              setShowCart(false);
              setShowNote(false);
            }}
            className="fixed right-0 top-0 z-40 h-screen w-[100%] bg-black opacity-60"
          ></div>
          <div className="fixed right-0 top-0 z-50 h-screen w-[100%] bg-white md:w-[50%] lg:w-[50%]">
            <RemoveScrollBar />
            <div className="mt-1 border-b-[2px] border-neutral-500">
              <div className="mx-5 flex h-16 justify-between">
                <div className="text-1xl grid content-center font-light">
                  Cart ({cartItems})
                </div>
                <img
                  onClick={() => setShowCart(false)}
                  className="my-auto h-3 hover:cursor-pointer"
                  src="https://cdn-icons-png.flaticon.com/512/2961/2961937.png"
                  alt=""
                />
              </div>
            </div>
            {!products && (
              <div className="m-auto flex h-[50%] w-max items-center text-center">
                Your cart is empty 👢
              </div>
            )}
            {products && (
              <>
                <div className="productCartList h-[calc(100vh-80px-140px)] overflow-y-auto">
                  s
                </div>
                <div className="absolute bottom-0 right-0 z-50 h-[150px] w-full border-t-[2px] border-neutral-500 bg-white">
                  <div className="m-5">
                    <p
                      onClick={() => setShowNote(true)}
                      className="underline hover:cursor-pointer"
                    >
                      {customerNote ? 'Edit Order Note' : 'Add Order Note'}
                    </p>
                    <p className="text-xs">
                      Shipping, taxes calculated at checkout
                    </p>
                    <Link to="/checkout" onClick={() => setShowCart(false)}>
                      <button className="relative mt-5 h-12 w-full bg-black text-white">
                        <div className="flex flex-row align-top">
                          <div className="basis-2/5 text-right">Checkout</div>
                          <div className="relative basis-1/5 text-center leading-none">
                            <div className="align-top">.</div>
                          </div>
                          <div className="basis-2/5 text-left">${123} USD</div>
                        </div>
                      </button>
                    </Link>
                  </div>
                </div>
              </>
            )}
            {showNote && (
              <>
                <div className="absolute bottom-0 right-0 z-50 w-full">
                  <div className="h-[calc(100vh-250px)] bg-white opacity-50"></div>
                  <div className="h-[250px] border-t-[2px] border-neutral-500 bg-white">
                    <div className="m-5">
                      <div className="mb-5 flex justify-between">
                        <div className="text-1xl grid content-center font-light">
                          Edit Order Note
                        </div>
                        <img
                          onClick={() => setShowNote(false)}
                          className="my-auto h-3 hover:cursor-pointer"
                          src="https://cdn-icons-png.flaticon.com/512/2961/2961937.png"
                          alt=""
                        />
                      </div>
                      <textarea
                        placeholder='s'
                        value={customerNote}
                        onChange={e => {
                          setCustomerNote(e.target.value);
                        }}
                        className="h-24 w-full resize-none border-[2px] border-neutral-500 p-3 focus:outline-none"
                      ></textarea>
                      <Link
                        to="/checkout"
                        onClick={() => {
                          setShowCart(false);
                          setShowNote(false);
                        }}
                      >
                        <button className="relative mt-5 h-12 w-full bg-black text-white">
                          <div className="flex flex-row align-top">
                            <div className="basis-2/5 text-right">Checkout</div>
                            <div className="relative basis-1/5 text-center leading-none">
                              <div className="align-top">.</div>
                            </div>
                            <div className="basis-2/5 text-left">
                              ${123} USD
                            </div>
                          </div>
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </>
      )}
    </>
  );
}

export default Header
