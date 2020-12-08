import { FC, useEffect, useState } from "react";

import spinner from "./spinner.gif";

type Props = {
  size?: number;
};

type Style = {
  margin: string;
  display: string;
  width?: string;
  height?: string;
};

const Spinner: FC<Props> = ({ size }) => {
  const [style, setStyle] = useState<Style>({
    margin: "auto",
    display: "block"
  });

  useEffect(() => {
    if (size) setStyle({ ...style, width: size + "rem", height: size + "rem" });
    else setStyle({ ...style, width: "100%" });
  }, [size]);

  return <img src={spinner} alt="Loading..." style={style} />;
};

export default Spinner;
