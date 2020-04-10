// import original module declaration
import "styled-components"

// and extend it
declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      background: string
      color: string
    }
  }
}
