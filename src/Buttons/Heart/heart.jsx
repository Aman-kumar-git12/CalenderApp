import React from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Checkbox from "@mui/material/Checkbox";

function Heart() {
   return (
      <div >
         <FormControlLabel
            control = {
               <Checkbox
                  icon = {<FavoriteBorderIcon />}
                  checkedIcon = {<FavoriteIcon style={{color:"red"}}/>}
               />
            }
         />
      </div>
   );
};
export default Heart;