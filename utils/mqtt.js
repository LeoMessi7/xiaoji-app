export const connection = {
    host: '121.36.229.15',
    port: 8083,
    endpoint: '/mqtt',
    clean: true, // 保留会话
    connectTimeout: 4000, // 超时时间
    reconnectPeriod: 4000, // 重连时间间隔
    clientId: 'mqttjs_12345',
}

export const client = {
	connected: false,
}

export const receiveNews = ''