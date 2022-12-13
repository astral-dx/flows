import {styled} from "@mui/material";
import { FlowImage } from "..";

const Wrapper = styled('div')<{ styles: Record<string, string | number> }>(({ theme, styles }) => ({
  margin: 0,
  ...styles
}));

const Img = styled('img')<{ styles: Record<string, string | number> }>(({ styles }) => ({
  maxWidth: '100%',
  ...styles
}));

export const ImageBlock: React.FC<{ image: FlowImage }> = ({ image }) => {
  return (
    <Wrapper styles={ image.blockStyles ?? {} }>
      <Img src={ image.base64 } alt={ image.alt ?? '' } styles={ image.imageStyles ?? {} } />
    </Wrapper>
  )
}