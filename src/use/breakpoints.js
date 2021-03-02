import {useBreakpoint} from "vue-composable";

export default function useBreakpoints() {
    const breakpoints = {
        xs:	1,
        sm:	599,
        md: 1024,
        lg: 1439,
        xl:	1920
    }

    const { current, xs, sm, md, lg, xl } = useBreakpoint(breakpoints)
    return { current, xs, sm, md, lg, xl }
}
