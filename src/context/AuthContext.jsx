import { auth } from "../firebase/firebase"
import { createContext, useContext } from "react"
import React, { useState, useEffect } from 'react'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, sendPasswordResetEmail, } from "firebase/auth"

export const authContext = createContext()

export const useAuth = () => {
    const context = useContext(authContext)
    if (!context) {
        console.log('eased')
    }
    return context
}

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    useEffect(() => {
        const suscribed = onAuthStateChanged(auth, (currentUser) => {
            if (!currentUser) {
                console.log('no hay usuario')
                setUser(null)
            } else {
                setUser(currentUser)
            }
        })
        return () => suscribed
    }, [])


    const registerEmail = async (email, passaword) => {
        const res = await createUserWithEmailAndPassword(auth, email, passaword)
            .then(res => console.log('1'))
            .catch((error) => {
                // alert(`Se rompio todo: ${error}`)
                const errorCode = error.code
                if (errorCode == 'auth/email-already-in-use') {
                    alert('El email ya esta en uso')
                } else (console.log(errorCode))
            })

    }

    const loginEmail = async (email, password) => {
        const res = await signInWithEmailAndPassword(auth, email, password)
            .then(res => console.log('res'))
            .catch((error) => {
                const errorCode = error.code
                if (errorCode == 'auth/user-not-found') {
                    alert('El email no coincide con una cuenta existente')
                } else if (errorCode == 'auth/wrong-password') {
                    alert('La contraseña no coicincide con el email brindado')
                } else (console.log(errorCode))

            })
    }

    const loginWithGoogle = async () => {
        const res = new GoogleAuthProvider()
        return await (signInWithPopup(auth, res))
    }

    const logout = async () => {
        const res = signOut(auth)
    }

    const resetPassword = async (email) => {
        try {
            await sendPasswordResetEmail(auth, email)
            alert('Correo electrónico de restablecimiento de contraseña enviado correctamente')
        } catch (error) {
            if (error.code == 'auth/user-not-found') {
                alert('El correo electronico no pertenece a usuario registrado')
            }
            console.log(error)
        }
    }

    return (
        <authContext.Provider
            value={
                {
                    registerEmail,
                    loginEmail,
                    loginWithGoogle,
                    logout,
                    user,
                    resetPassword,
                }
            }
        >
            {children}
        </authContext.Provider>
    )
} 