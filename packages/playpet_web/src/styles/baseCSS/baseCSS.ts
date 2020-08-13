import { css } from "@emotion/core"
import normalize from "./normalize"
// // import metroSans from './metroSans';

const baseCSS = css`
  * {
    /* font-family: 'Metro Sans'; */
    box-sizing: border-box;
  }

  ${normalize};
`

export default baseCSS
