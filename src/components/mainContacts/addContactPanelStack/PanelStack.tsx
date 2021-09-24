import React from "react"

import { useAppSelector, useAppDispatch } from '../../../redux/hooks'
import { navigationSlice } from '../../../redux/slices/navigationSlice';

import {
    Dialog,
} from "@blueprintjs/core";

import { motion, AnimatePresence } from "framer-motion";

import styled from 'styled-components'

import InitialPanel from "./InitialPanel";
import AddManualPanel from "./AddManualPanel";
import SelectGooglePanel from "./SelectGooglePanel";
import AddGooglePanel from "./AddGooglePanel";

interface StyledStackContainerProps {
    contactsPanelStackPage: string
}

const StyledStackContainer = styled(motion.div) <StyledStackContainerProps>`
position: relative;
            height: 330px;
            width: 400px;
            overflow-y: ${props => props.contactsPanelStackPage === "selectgoogle" ? "auto" : "hidden"};
            overflow-x: hidden;
            padding: 0;
            margin: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-left: auto;
            margin-right: auto;
            z-index: 0;
            /* border: 1px solid; */

`

const StyledDialog = styled(Dialog)`
width: auto;
background-color: white;
margin-top: 50px;
    margin-bottom: auto;
    padding-bottom: 0px;
`


interface Props {

}

export const PanelStack: React.FunctionComponent<Props> = ({ }) => {

    const dispatch = useAppDispatch()

    const contactsPanelDialogOpen = useAppSelector((state) => state.navigation.contactsPanelDialogOpen)
    const contactsPanelStackPage = useAppSelector((state) => state.navigation.contactsPanelStackPage)
    const contactsPanelStackDirection = useAppSelector((state) => state.navigation.contactsPanelStackDirection)

    const variants = {
        enter: (direction: number) => {
            return {
                x: direction > 0 ? 1000 : -1000,
                opacity: 0
            };
        },
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1
        },
        exit: (direction: number) => {
            return {
                zIndex: 0,
                x: direction > 0 ? -1000 : 1000,
                opacity: 0
            };
        }
    };

    const panelSizeVariants = {
        initial: {
            height: "330px",
            width: "400px"
        },
        addmanual: {
            height: "650px",
            width: "400px"
        },
        selectgoogle: {
            height: "650px",
            width: "450px"
        },
        addgoogle: {
            height: "650px",
            width: "400px"
        },
    }

    const spring = {
        type: "spring",
        damping: 30,
        stiffness: 300
    }

    /* const [[page, direction], setPage] = React.useState([0, 0]); */

    /* const paginate = (newDirection: number) => {
        if (page === 0) {
            setPage([1, newDirection]);
        } else setPage([0, newDirection]);

    }; */

    /* const panel1 = () => {
        return (
            <div style={{display: "flex", margin: "auto"}}>
                Panel 1
                <Button onClick={()=>paginate(1)}>Panel 2</Button>
            </div>
        )
    } */

    /* const panel2 = () => {
        return (
            <div style={{display: "flex", margin: "auto"}}>
                Panel 2
                <Button onClick={()=>paginate(-1)}>Panel 1</Button>
            </div>
        )
    } */

    const getPanel = () => {
        switch (contactsPanelStackPage) {
            case "ïnitial":
                return <InitialPanel />

            case "addmanual":
                return <AddManualPanel />
            case "selectgoogle":
                return <SelectGooglePanel />
            case "addgoogle":
                return <AddGooglePanel />
            default:
                return <InitialPanel />
        }

        /* if (page === 0) {
            return panel1()
        } else return panel2() */
    }

    const handleClose = () => {
        dispatch(navigationSlice.actions.setContactsPanelDialogOpen(false))
        dispatch(navigationSlice.actions.setContactsPanelStackPage("initial"))
        
    }

    const disableScroll = () => {
        
       var scrollTop = window.scrollY
            window.onscroll = () => {
                window.scrollTo(0, scrollTop);
            };
    }

    const enableScroll = () => {
        window.onscroll = function() {};
    }

    React.useEffect(() => {
        if(contactsPanelDialogOpen===true) {
            disableScroll()
        } else {
            enableScroll()
        }
    }, [contactsPanelDialogOpen])







    return (
        <StyledDialog
            autoFocus={true}
            canEscapeKeyClose={true}
            canOutsideClickClose={true}
            enforceFocus={true}
            isOpen={contactsPanelDialogOpen}
            usePortal={true}
            onClose={handleClose}
        >
            <StyledStackContainer
                contactsPanelStackPage={contactsPanelStackPage}
                variants={panelSizeVariants}
                animate={contactsPanelStackPage}
                transition={spring}
            >
                <AnimatePresence initial={false} custom={contactsPanelStackDirection}>
                    <motion.div
                        style={{ position: "absolute", display: "flex", width: "100%", top: 0 }}
                        key={contactsPanelStackPage}

                        custom={contactsPanelStackDirection}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            x: { type: "spring", stiffness: 300, damping: 30 },
                            opacity: { duration: 0.2 }
                        }}
                    /*   drag="x"
                      dragConstraints={{ left: 0, right: 0 }}
                      dragElastic={1}
                      onDragEnd={(e, { offset, velocity }) => {
                        const swipe = swipePower(offset.x, velocity.x);
            
                        if (swipe < -swipeConfidenceThreshold) {
                          paginate(1);
                        } else if (swipe > swipeConfidenceThreshold) {
                          paginate(-1);
                        }
                      }} */
                    >
                        {getPanel()}

                    </motion.div>
                </AnimatePresence>
                {/* <div className="next" onClick={() => paginate(1)}>
                {"‣"}
            </div>
            <div className="prev" onClick={() => paginate(-1)}>
                {"‣"}
            </div> */}
            </StyledStackContainer>


        </StyledDialog>

    )

}

export default PanelStack