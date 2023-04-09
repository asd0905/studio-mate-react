import { Helmet } from "react-helmet-async";
import { IMetaProps } from "../../interfaces/interface";

const Meta = ({ name, id, image }: IMetaProps) => {
    return (
        <Helmet>
            <title>{name}</title>
            <meta name="description" content={name} />
            <meta property="og:type" content="website" />
            <link href={image} />
            <meta name="og:title" content={name} />
            <meta name="og:description" content={name} />
            <meta property="og:image" content={image} />
        </Helmet>
    )
}

export default Meta;