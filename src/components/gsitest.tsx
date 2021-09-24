import React from "react"
interface Props {

}
export const gsitest: React.FunctionComponent<Props> = ({ }) => {

const [gsiScriptLoaded, setGsiScriptLoaded] = React.useState(false)
    const [user, setUser] = React.useState(undefined)

    const handleGoogleSignIn = (res: CredentialResponse) => {
        if (!res.clientId || !res.credential) return

        

        // Implement your login mutations and logic here.
        // Set cookies, call your backend, etc. 
        //@ts-ignore
        /*  setUser(val.data?.login.user) */
        console.log(res)
    }

    window.handleGoogleSignIn = (res: CredentialResponse) => {
        
        if (!res.clientId || !res.credential) return

       

        // Implement your login mutations and logic here.
        // Set cookies, call your backend, etc. 
        //@ts-ignore
        /*  setUser(val.data?.login.user) */
        console.log(res)
    }


React.useEffect(() => {
    //@ts-ignore
    if (user?._id || gsiScriptLoaded) return

    const initializeGsi = () => {
        // Typescript will complain about window.google
        // Add types to your `react-app-env.d.ts` or //@ts-ignore it.
        if (!window.google || gsiScriptLoaded) return

        setGsiScriptLoaded(true)
        window.google.accounts.id.initialize({
            client_id: "646424163571-sret013veeg1sr5m72v8neuu4kh7ell6.apps.googleusercontent.com",
            callback: handleGoogleSignIn,
        })
    }

    const script = document.createElement("script")
    script.src = "https://accounts.google.com/gsi/client"
    script.onload = initializeGsi
    script.async = true
    script.id = "google-client-script"
    document.querySelector("body")?.appendChild(script)

    return () => {
        // Cleanup function that runs when component unmounts
        window.google?.accounts.id.cancel()
        document.getElementById("google-client-script")?.remove()
    }
    //@ts-ignore
}, [handleGoogleSignIn, /* initializeGsi, */ user?._id])

return (
<div>

<div id="g_id_onload"
    data-client_id="646424163571-sret013veeg1sr5m72v8neuu4kh7ell6.apps.googleusercontent.com"
    data-callback="handleGoogleSignIn"
    data-auto_select="true"
    data-auto_prompt="false">
</div>
<div className="g_id_signin"
    data-type="standard"
    data-size="large"
    data-theme="outline"
    data-text="sign_in_with"
    data-shape="rectangular"
    data-logo_alignment="left">
</div>
</div>
)
}

export default gsitest