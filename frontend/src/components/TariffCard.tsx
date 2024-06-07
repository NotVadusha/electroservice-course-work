import { Box, Typography } from "@mui/material";
import { FC } from "react";

interface TariffCardProps {
  text: string;
  description: string;
}

const TariffCard: FC<TariffCardProps> = ({ description, text }) => {
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      width={"fit-content"}
      bgcolor={"violet"}
    >
      <Typography textAlign={"center"} p={4}>
        {text}
      </Typography>
      <Typography textAlign={"center"} p={4}>
        {description}
      </Typography>
    </Box>
  );
};

export default TariffCard;
