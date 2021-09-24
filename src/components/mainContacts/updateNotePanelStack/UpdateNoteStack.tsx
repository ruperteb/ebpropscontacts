import React from "react"

import { useAppSelector, useAppDispatch } from '../../../redux/hooks'
import { navigationSlice } from '../../../redux/slices/navigationSlice';

import {
    Dialog,
} from "@blueprintjs/core";

import { motion, AnimatePresence } from "framer-motion";

import styled from 'styled-components'

import UpdateNotePanel from "./UpdateNotePanel";

const StyledStackContainer = styled(motion.div)`
position: relative;
            height: 300px;
            width: 400px;
            overflow: hidden;
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

export const UpdateNoteStack: React.FunctionComponent<Props> = ({ }) => {

    const dispatch = useAppDispatch()

    const updateNotePanelDialogOpen = useAppSelector((state) => state.navigation.updateNotePanelDialogOpen)
    /* const contactsPanelStackPage = useAppSelector((state) => state.navigation.contactsPanelStackPage)
    const contactsPanelStackDirection = useAppSelector((state) => state.navigation.contactsPanelStackDirection) */

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
        /* initial: {
            height: "300px",
            width: "400px"
        }, */
        updatemanual: {
            height: "400px",
            width: "600px"
        },
        /* addgoogle: {
            height: "800px",
            width: "400px"
        } */
    }

    const spring = {
        type: "spring",
        damping: 30,
        stiffness: 300
      }
    

    const handleClose =()=> {
        dispatch(navigationSlice.actions.setUpdateNotePanelDialogOpen(false))
        
    }

    return (
        <StyledDialog
        autoFocus= {true}
        canEscapeKeyClose= {true}
        canOutsideClickClose= {true}
        enforceFocus= {true}
        isOpen= {updateNotePanelDialogOpen}
        usePortal= {true}
        onClose={handleClose}
        >
            <StyledStackContainer
            variants={panelSizeVariants}
            animate={"updatemanual"}
            transition={spring}
            >
                <AnimatePresence initial={false} /* custom={contactsPanelStackDirection} */>
                    <motion.div
                        style={{ position: "absolute", display: "flex", width: "100%", top: 0, height: "100%" }}
                        key={"updateNotePanel"}

                        /* custom={contactsPanelStackDirection} */
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
                        <UpdateNotePanel></UpdateNotePanel>

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

export default UpdateNoteStack