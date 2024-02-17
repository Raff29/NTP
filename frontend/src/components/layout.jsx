import Footer from "./footer.tsx"


export default function Layout({ children }) {
    return (
        <div>
            <h1>Layout</h1>
            {children}
            <Footer />
        </div>
    )
}