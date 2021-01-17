import React, { ReactElement } from "react";
import { Banner } from "../../utils/interfaces";
import { url } from "../../config/constants";
import Link from "next/link";

interface BannerProps {
  banner: Banner;
}

const BannerComponent: React.FC<BannerProps> = ({ banner }): ReactElement => {
  return (
    <div className="banner">
      <Link href={`${
              banner.refType == "product"
                ? `/p/${banner.refId._id}`
                : `/search?cat=${banner.refId._id}`
              }`}>
        <a>
          <img
            alt="banner"
            src={`${url}/uploads/slider/resized/${banner?.image}`}
          />
        </a>
      </Link>
    </div>
  );
};

export default BannerComponent;
