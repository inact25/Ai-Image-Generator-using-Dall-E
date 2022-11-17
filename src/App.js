import './App.css';
import {generateAiImage, openai} from "./services/api";
import {useEffect, useState} from "react";
import {Button, Col, Input, Layout, Radio, Row, Typography} from "antd";
import Swal from "sweetalert2";
import {Content} from "antd/es/layout/layout";
import {IoLogoElectron} from "react-icons/io5";

function App() {
    const [data, setData] = useState([])
    const [prompt, setPropmt] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [modes, setModes] = useState('')

    const handleModes = (key) => {

        let map = {
            "three-dimension": ", 3D",
            "digital": ", Digital Art",
            "painting": ", Outpainting",
            "normal": "",
        }
        return map[key]

    }

    const getAiImage = async (prompt, modes) => {
        setIsLoading(true)
        let curentMode = await handleModes(modes)

        generateAiImage(prompt, "1024x1024", curentMode)
            .then(e => {
                setData(e.data.data)
                setIsLoading(false)
            })
            .catch(e => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: e.message,
                })
                setIsLoading(false)
            })
    }



    return (
        <Layout className="App" style={{width: "100%"}}>
            <Content>
                <Row justify={"start"} align={"middle"} style={{minHeight: '100vh'}}>
                    <Col lg={8} style={{
                        background: '#212129',
                        minHeight: "100vh",
                        padding: "5rem",
                        paddingTop: "10rem",
                        color: 'whitesmoke',
                    }}>
                        <Typography style={{fontSize: 68, color: "whitesmoke"}}><IoLogoElectron/></Typography>
                        <h1 style={{color: "white", marginBottom: "5rem"}}>Turn your story to unique images</h1>
                        <Input.TextArea
                            style={{marginBottom: "2rem", background: "white", borderRadius: 8}}
                            size='large'
                            placeholder="lets tell your story today"
                            onChange={e => setPropmt(e.target.value)}
                            value={prompt}
                            rows={6}
                            maxRows={6}
                            autoSize={false}
                            allowClear
                            bordered={false}
                        />
                        <div>
                            <p style={{fontWeight: 700}}>Modes</p>
                        </div>
                        <div>
                            <Radio.Group size={"large"} onChange={e => setModes(e.target.value)} value={modes}>
                                <Radio.Button value="normal">Normal</Radio.Button>
                                <Radio.Button value="three-dimension">3D</Radio.Button>
                                <Radio.Button value="painting">Painting</Radio.Button>
                                <Radio.Button value="digital">Digital Art</Radio.Button>
                            </Radio.Group>
                        </div>
                        <div style={{marginTop: "5rem"}}>
                            <Button size={"large"} disabled={isLoading} onClick={() => getAiImage(prompt, modes)} block>Generate Image</Button>
                        </div>
                    </Col>
                    <Col lg={16} style={{
                        minHeight: "100vh",
                        padding: "5rem",
                        paddingTop: "10rem",
                    }}>
                        <div>
                            {!isLoading ?
                                <div>
                                    <h2 style={{marginBottom: "3rem"}}>{prompt || "I dream to paint and then I paint my dream - Vincent Van Gogh"}</h2>
                                    <Row gutter={[16, 16]} justify={"center"} align={"middle"}>
                                        {data?.map(item =>
                                            <Col md={6}>
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

                                </div> : <img src="/loader.gif" width={100} alt=""/>}
                        </div>
                    </Col>
                </Row>

            </Content>
        </Layout>
    );
}

export default App;
