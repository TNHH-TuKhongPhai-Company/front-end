import Image from "next/image";
import React from "react";

type Props = {
  data: any;
};

const Weather = (props: Props) => {

  return (
    <div className="relative flex flex-col justify-between z-10 text-white max-w-[500px] w-full max-h-[100vh] m-auto px-4 mt-4">
      {props.data.current && (
        <div>
          {/* Top */}
          <div className="flex items-center justify-between pt-8">
            <div className="flex flex-col justify-between items-center">
              <Image
                src={"https:" + props.data.current.condition.icon}
                alt="weather image"
                width={100}
                height={100}
              />
              <p className="text-white py-2 text-2xl font-bold">
                {props.data.current.condition.text}
              </p>
            </div>
            <div className="text-9xl">
              <p>{props.data.current.temp_c}&#176;</p>
            </div>
          </div>
          {/* Bottom */}
          <div className="bg-black/50 relative p-8 rounded-md">
            <p className="text-2xl text-center pb-6">Thời tiết tại {props.data.location.name}/{props.data.location.country}</p>
            <div className="flex justify-between text-center">
              <div>
                <p className="font-bold text-2xl">{props.data.current.feelslike_c}&#176;</p>
                <p className="text-xl">Ngoài trời</p>
              </div>
              <div>
                <p className="font-bold text-2xl">{props.data.current.humidity}%</p>
                <p className="text-xl">Khả năng mưa</p>
              </div>
              <div>
                <p className="font-bold text-2xl">{props.data.current.wind_kph} km/h</p>
                <p className="text-xl">Gió</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;
