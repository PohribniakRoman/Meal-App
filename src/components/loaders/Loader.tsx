export interface loader {
    fullsize?:boolean
} 

export const Loader:React.FC<loader> = ({fullsize = false}) => {
    return <div className={`center-body ${fullsize?"fullsize-loader":""}`}>
        <div className="loader-circle-75"></div>
    </div>
}