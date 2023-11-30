import React, { useState, Suspense, useRef } from "react";
import { useSession, signOut, getSession } from "next-auth/react";
import axios from "axios";
import { BsSearch } from "react-icons/bs";
import Image from "next/image";
import weatherImg from "../../public/weather.jpg";
import Weather from "@/components/Weather";
import Head from "next/head";

type Props = {};

const WeatherApp = (props: Props) => {
  const { data: session, status } = useSession({ required: true });
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [userMenu, setUserMenu] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null)

  const urlLocation = `http://api.weatherapi.com/v1/current.json?key=${process.env.NEXT_PUBLIC_WEATHER_KEY}&q=${city}&lang=vi`;

  const fetchWeather = (e: any) => {
    e.preventDefault();
    if (city !== "") {
      setLoading(true);
      setSubmitted(true);
      axios
        .get(urlLocation)
        .then((response) => setWeather(response.data))
        .catch((err) => console.log(err));
      setLoading(false);
      setCity("");
      if (inputRef.current) {
        inputRef.current.blur()
      }
    }
  };

  if (status === "authenticated") {
    if (session.user) {
      return (
        <div className="">
          <Head>
            <title>Weather App</title>
          </Head>
          <div className="absolute top-0 left-0 right-0 bottom-0 bg-black/20 z-[1]"></div>
          {/* Background Image */}
          <Image
            className="object-cover"
            src={weatherImg}
            layout="fill"
            alt="weather background"
          />

          {/* Search */}
          <div className="relative flex justify-between items-center w-full m-auto pt-4 px-4 text-white z-10">
            <div className="max-w-[70%] w-full">
              <form
                onSubmit={fetchWeather}
                className="flex justify-between items-center w-full m-auto p-2 bg-transparent border border-gray-300 text-white rounded-2xl"
              >
                <div className="w-full">
                  <input
                    onChange={(e) => setCity(e.target.value)}
                    className="bg-transparent border-none text-white focus:outline-none text-2xl pl-3 placeholder:text-gray-600 w-full"
                    type="text"
                    placeholder="VD: Ha Noi"
                    ref={inputRef}
                    value={city}
                  />
                </div>
                <button type="submit" className="px-4 py-2">
                  <BsSearch size={20} />
                </button>
              </form>
            </div>
            {/* User */}
            <div className="max-w-[25%] flex justify-center items-center">
              <div className="break-words hidden md:flex">
                Hi,{" "}<p className="font-bold">{session.user.name}</p>
              </div>
              <div
                onClick={() => setUserMenu(!userMenu)}
                className="p-2 cursor-pointer min-w-[48px] min-h-[48px]"
              >
                <Image
                  className="rounded-[50%]"
                  src={session.user.image!}
                  alt="user avatar"
                  width={36}
                  height={36}
                />
              </div>
              <div className={userMenu ? "flex" : "hidden"}>
                <div className="absolute top-16 right-0 min-w-[150px] max-h-[48px] text-center bg-black/80 rounded-md shadow-lg shadow-gray-300">
                  <button className="py-2 w-full" onClick={() => signOut()}>
                    Log Out
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Weather */}
          {submitted ? (
            <Suspense fallback={<p>Loading weather...</p>}>
              <Weather data={weather} />
            </Suspense>
          ) : (
            ""
          )}
        </div>
      );
    }
  } else {
    return (
      <div>
        <p>You are not signed in.</p>
      </div>
    );
  }
};

export default WeatherApp;

export const getServerSideProps = async (context: any) => {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/login",
      },
    };
  }
  return {
    props: {
      session,
    },
  };
};
