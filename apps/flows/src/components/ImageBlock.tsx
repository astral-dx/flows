import {styled} from "@mui/material";

const Wrapper = styled('div')<{ styles: Record<string, string | number> }>(({ theme, styles }) => ({
  margin: theme.spacing(3, 0),
  ...styles
}));

const Img = styled('img')<{ styles: Record<string, string | number> }>(({ styles }) => ({
  maxWidth: '100%',
  ...styles
}));

export const ImageBlock: React.FC<{ base64Image: string, alt?: string, label?: string, imageStyles?: Record<string, string | number>, blockStyles?: Record<string, string | number> }> = ({ base64Image, alt, label, imageStyles, blockStyles }) => {
  return (
    <Wrapper styles={ blockStyles ?? {} }>
      <Img src={ base64Image } alt={ alt ?? '' } styles={ imageStyles ?? {} } />
    </Wrapper>
  )
}