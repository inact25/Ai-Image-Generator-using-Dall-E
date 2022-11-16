import './App.css';
import {generateAiImage, openai} from "./services/api";
import {useState} from "react";
import {Col, Input, Layout, Row} from "antd";

function App() {
    const [data, setData] = useState([])
    const [prompt, setPropmt] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const {Search} = Input;
    const {Header, Content, Footer} = Layout;
    const getAiImage = (prompt) => {
        setIsLoading(true)
        generateAiImage(prompt, "1024x1024")
            .then(e => {
                setData(e.data.data)
                setIsLoading(false)
            })
            .catch(e => {
                alert(e)
                setIsLoading(false)
            })
    }


    return (
        <Layout className="App">
            <Content style={{padding: 50, minHeight: "100vh"}}>
                <div style={{marginTop: "10%"}}>
                    <Search
                        style={{maxWidth: 500, marginBottom: "2rem"}}
                        size='large'
                        placeholder="lets tell your story today"
                        onChange={e => setPropmt(e.target.value)}
                        onSearch={(e) => getAiImage(prompt)}
                        loading={isLoading}
                        enterButton
                    />
                    <div style={{marginBottom: "3rem"}}>
                        <h2>{prompt}</h2>
                    </div>
                    {!isLoading ?
                        <div>
                            <Row gutter={[16, 16]} justify={"center"} align={"middle"}>
                                {data?.map(item =>
                                    <Col md={3}>
                                        <img loading='lazy' style={{
                                            width: "100%",
                                            height: "auto",
                                            borderRadius: "1rem",
                                            objectFit: "contain"
                                        }}
                                             src={item.url} alt=""/>
                                    </Col>
                                )}
                            < /Row>

                        </div> : <img src="/loader.gif" width={100}  alt=""/>}
                    <div style={{margin: "2rem"}}>
                        <h2>Turn your story to unique images</h2>
                    </div>
                </div>
            </Content>
            <div style={{marginTop:"-5rem"}}>
                <img width={38} height={38} style={{borderRadius:"100%", marginBottom:"1rem"}}
                     src="https://media-exp1.licdn.com/dms/image/C560BAQFT9vMllW1AjA/company-logo_200_200/0/1616034348143?e=2147483647&v=beta&t=MyH5h7P6-GsEnjUWTv00qoDQqSl9hZQyGy9ahOji72U"
                     alt=""/>
                <div><a href="https://javapixa.com">javapixa creative studio</a></div>
            </div>
        </Layout>
    );
}

export default App;
