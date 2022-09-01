import type { NextPage } from "next";
import Head from "next/head";

const InstaLogLogo: React.FunctionComponent = () => {
  return (<svg height="32" viewBox="0 0 294 66" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M62.6204 52L68.3984 22.948H76.7684L70.9904 52H62.6204ZM74.0144 18.898C72.5384 18.898 71.3504 18.484 70.4504 17.656C69.5504 16.792 69.1004 15.748 69.1004 14.524C69.1004 13.084 69.6044 11.896 70.6124 10.96C71.6564 9.988 73.0064 9.502 74.6624 9.502C76.1384 9.502 77.3264 9.916 78.2264 10.744C79.1624 11.536 79.6304 12.526 79.6304 13.714C79.6304 15.262 79.1084 16.522 78.0644 17.494C77.0564 18.43 75.7064 18.898 74.0144 18.898ZM101.49 22.516C103.974 22.516 106.08 23.038 107.808 24.082C109.536 25.09 110.76 26.584 111.48 28.564C112.2 30.544 112.272 32.992 111.696 35.908L108.456 52H100.032L103.164 36.448C103.596 34.324 103.416 32.686 102.624 31.534C101.868 30.382 100.464 29.806 98.4118 29.806C96.2878 29.806 94.5058 30.418 93.0658 31.642C91.6618 32.866 90.6898 34.738 90.1498 37.258L87.2338 52H78.8098L84.5878 22.948H92.5798L90.9058 31.156L89.7178 28.672C91.1218 26.548 92.8498 25 94.9018 24.028C96.9898 23.02 99.1858 22.516 101.49 22.516ZM126.73 52.432C124.174 52.432 121.762 52.144 119.494 51.568C117.262 50.992 115.534 50.272 114.31 49.408L117.55 43.306C118.81 44.134 120.34 44.8 122.14 45.304C123.976 45.808 125.812 46.06 127.648 46.06C129.628 46.06 131.068 45.808 131.968 45.304C132.868 44.8 133.318 44.116 133.318 43.252C133.318 42.568 132.94 42.064 132.184 41.74C131.428 41.38 130.474 41.092 129.322 40.876C128.17 40.66 126.928 40.408 125.596 40.12C124.3 39.832 123.058 39.436 121.87 38.932C120.718 38.392 119.764 37.636 119.008 36.664C118.288 35.656 117.928 34.342 117.928 32.722C117.928 30.526 118.54 28.672 119.764 27.16C121.024 25.648 122.752 24.496 124.948 23.704C127.18 22.912 129.7 22.516 132.508 22.516C134.524 22.516 136.486 22.732 138.394 23.164C140.302 23.596 141.922 24.19 143.254 24.946L140.23 31.102C138.862 30.238 137.422 29.662 135.91 29.374C134.434 29.05 133.012 28.888 131.644 28.888C129.664 28.888 128.224 29.176 127.324 29.752C126.46 30.292 126.028 30.958 126.028 31.75C126.028 32.434 126.388 32.974 127.108 33.37C127.864 33.73 128.818 34.036 129.97 34.288C131.122 34.504 132.364 34.756 133.696 35.044C135.028 35.296 136.27 35.692 137.422 36.232C138.574 36.736 139.51 37.474 140.23 38.446C140.986 39.382 141.364 40.66 141.364 42.28C141.364 44.476 140.716 46.348 139.42 47.896C138.16 49.408 136.432 50.542 134.236 51.298C132.04 52.054 129.538 52.432 126.73 52.432ZM156.659 52.432C154.571 52.432 152.789 52.018 151.313 51.19C149.837 50.326 148.775 49.102 148.127 47.518C147.515 45.898 147.425 43.99 147.857 41.794L152.879 16.522H161.303L156.281 41.74C156.065 42.964 156.191 43.936 156.659 44.656C157.127 45.376 157.991 45.736 159.251 45.736C159.827 45.736 160.403 45.646 160.979 45.466C161.591 45.286 162.149 45.034 162.653 44.71L163.895 50.704C162.851 51.352 161.699 51.802 160.439 52.054C159.179 52.306 157.919 52.432 156.659 52.432ZM145.697 30.076L146.993 23.596H167.135L165.839 30.076H145.697ZM180.526 52.432C178.294 52.432 176.224 51.928 174.316 50.92C172.408 49.876 170.878 48.382 169.726 46.438C168.574 44.494 167.998 42.154 167.998 39.418C167.998 36.97 168.394 34.72 169.186 32.668C170.014 30.616 171.166 28.834 172.642 27.322C174.118 25.81 175.828 24.64 177.772 23.812C179.716 22.948 181.804 22.516 184.036 22.516C186.448 22.516 188.518 22.966 190.246 23.866C191.974 24.766 193.252 26.17 194.08 28.078C194.944 29.95 195.25 32.38 194.998 35.368C194.818 38.788 194.116 41.794 192.892 44.386C191.668 46.942 190.012 48.922 187.924 50.326C185.872 51.73 183.406 52.432 180.526 52.432ZM183.118 45.466C184.774 45.466 186.232 45.07 187.492 44.278C188.788 43.45 189.796 42.334 190.516 40.93C191.272 39.49 191.65 37.816 191.65 35.908C191.65 33.928 191.056 32.362 189.868 31.21C188.716 30.058 187.096 29.482 185.008 29.482C183.388 29.482 181.93 29.896 180.634 30.724C179.338 31.516 178.312 32.632 177.556 34.072C176.836 35.476 176.476 37.132 176.476 39.04C176.476 41.02 177.052 42.586 178.204 43.738C179.392 44.89 181.03 45.466 183.118 45.466ZM188.896 52L190.03 46.222L191.92 37.582L193.054 28.942L194.242 22.948H202.666L196.888 52H188.896ZM204.687 52L212.679 11.932H221.103L213.111 52H204.687ZM236.103 52.432C233.151 52.432 230.577 51.892 228.381 50.812C226.185 49.732 224.475 48.22 223.251 46.276C222.063 44.332 221.469 42.046 221.469 39.418C221.469 36.178 222.225 33.298 223.737 30.778C225.249 28.222 227.319 26.206 229.947 24.73C232.611 23.254 235.635 22.516 239.019 22.516C242.007 22.516 244.581 23.056 246.741 24.136C248.937 25.216 250.629 26.728 251.817 28.672C253.041 30.58 253.653 32.866 253.653 35.53C253.653 38.734 252.897 41.614 251.385 44.17C249.873 46.726 247.803 48.742 245.175 50.218C242.547 51.694 239.523 52.432 236.103 52.432ZM236.643 45.52C238.299 45.52 239.757 45.124 241.017 44.332C242.313 43.504 243.321 42.37 244.041 40.93C244.761 39.49 245.121 37.816 245.121 35.908C245.121 33.964 244.545 32.398 243.393 31.21C242.241 30.022 240.621 29.428 238.533 29.428C236.877 29.428 235.401 29.842 234.105 30.67C232.845 31.462 231.837 32.578 231.081 34.018C230.361 35.458 230.001 37.132 230.001 39.04C230.001 41.02 230.577 42.604 231.729 43.792C232.881 44.944 234.519 45.52 236.643 45.52ZM268.627 62.908C265.819 62.908 263.227 62.584 260.851 61.936C258.511 61.288 256.495 60.334 254.803 59.074L258.799 52.972C259.951 53.908 261.427 54.664 263.227 55.24C265.063 55.816 266.989 56.104 269.005 56.104C271.921 56.104 274.099 55.474 275.539 54.214C277.015 52.954 278.005 51.082 278.509 48.598L279.535 43.36L281.479 36.556L282.775 29.212L283.963 22.948H292.009L287.203 47.14C286.087 52.72 283.963 56.734 280.831 59.182C277.735 61.666 273.667 62.908 268.627 62.908ZM269.869 50.596C267.493 50.596 265.333 50.11 263.389 49.138C261.445 48.166 259.897 46.78 258.745 44.98C257.593 43.144 257.017 40.948 257.017 38.392C257.017 36.16 257.413 34.09 258.205 32.182C259.033 30.274 260.167 28.6 261.607 27.16C263.083 25.684 264.793 24.55 266.737 23.758C268.717 22.93 270.877 22.516 273.217 22.516C275.341 22.516 277.267 22.912 278.995 23.704C280.723 24.496 282.055 25.774 282.991 27.538C283.963 29.302 284.323 31.66 284.071 34.612C283.855 37.816 283.153 40.624 281.965 43.036C280.777 45.412 279.157 47.266 277.105 48.598C275.089 49.93 272.677 50.596 269.869 50.596ZM272.137 43.684C273.793 43.684 275.251 43.324 276.511 42.604C277.771 41.884 278.761 40.894 279.481 39.634C280.201 38.338 280.561 36.862 280.561 35.206C280.561 33.442 279.985 32.056 278.833 31.048C277.681 30.004 276.079 29.482 274.027 29.482C272.371 29.482 270.895 29.842 269.599 30.562C268.339 31.282 267.331 32.29 266.575 33.586C265.855 34.846 265.495 36.304 265.495 37.96C265.495 39.724 266.089 41.128 267.277 42.172C268.465 43.18 270.085 43.684 272.137 43.684Z" fill="white" />
    <path d="M18.3246 57.6821C12.9811 55.582 8.33001 51.6406 5.41817 46.1766C-1.0749 33.9925 3.53856 18.8517 15.7227 12.3587C27.5886 6.03509 42.259 10.2457 49.0146 21.7244C45.8151 29.1412 40.7096 36.9781 33.9659 44.2725C28.9907 49.654 23.6513 54.1696 18.3246 57.6821Z" fill="white" />
    <path d="M1.15536 63.5907C-1.62694 61.4984 1.05779 54.5546 4.53173 49.8417L5.60686 51.3597C4.31558 54.4084 2.06457 60.6068 11.308 53.4591C20.5513 46.3115 36.0412 26.3929 42.6912 14.3788C48.0112 4.76755 42.2575 7.05032 38.8064 9.25974L37.293 8.44592C40.7994 5.04816 46.908 0.955984 49.8313 2.24235C56.1728 5.03281 51.4504 23.1803 37.1901 40.7773C22.9297 58.3742 5.08086 66.5426 1.15536 63.5907Z" fill="white" />
    <path d="M52.3359 31.702C53.4107 41.56 48.5222 51.5323 39.2358 56.4811C36.0765 58.1648 32.7185 59.1017 29.3639 59.3534C32.5966 53.3272 36.9549 47.1438 42.3065 41.2642C45.5382 37.7138 48.9141 34.5135 52.3359 31.702Z" fill="white" />
  </svg>);
}

const Naviagtion: React.FunctionComponent = () => {
  return (

    <header className="fixed transition ease-in-out duratio-100 top-0 z-30 w-full bg-black-95 backdrop-blur-md block">
      <div className="flex items-center justify-between w-full max-w-screen-lg mx-auto">
        <div className="hidden w-full text-sm font-medium nav-desktop lg:block">
          <div className="flex items-center justify-between w-full max-w-screen-lg py-4 mx-auto">
            <div className="flex items-center justify-start w-1/3">
              <span >
                <a href="/" >
                  <InstaLogLogo />
                </a>
              </span>
            </div>
            <div className="flex items-center justify-center flex-grow antialiased">
              <ul className="flex items-center">
                <li className="relative transition duration-200 ease-in-out text-gray-300 hover:text-white">
                  <a href="#" className="px-6 py-3 rounded-lg inline-block whitespace-nowrap ">Why?</a>
                </li>
                <li className="relative transition duration-200 ease-in-out text-gray-300 hover:text-white">
                  <a href="#" className="px-6 py-3 rounded-lg inline-block whitespace-nowrap ">Gallery</a>
                </li>
                <li className="relative transition duration-200 ease-in-out text-gray-300 hover:text-white">
                  <a href="#" className="px-6 py-3 rounded-lg inline-block whitespace-nowrap ">Pricing</a>
                </li>
              </ul>
            </div>
            <div className="flex items-center justify-end w-1/3">
              <ul className="flex items-center">
                <li >
                  <a href="https://dashboard.instatus.com/get" className="px-3 py-2 text-black uppercase rounded-full bg-gray-200 hover:bg-black hover:text-white border-gray-200 hover:border-gray-200 border transition ease-out duration-150">LOGIN</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col min-h-screen font-sans">
        <Naviagtion />
      </div>
    </>
  );
};



export default Home;
