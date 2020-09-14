import request from '@/utils/request'

// 发送验证码
export const sendCode = data => request.post('/common/sms/send', data, false)

// 上传图片
export const uploadImage = data => request.post('/common/upload/uploadImage', data, false)

// 领样宣传列表
export const samplingPropagandaList = data => request.post('/samplingPropaganda/samplingPropagandaList', data, false)

// 滚动宣传列表
export const rollPropagandaList = data => request.post('/rollPropaganda/rollPropagandaList', data, false)

// 轮播图
export const advertList = data => request.post('/advert/advertList', data, false)

// 联系客服
export const customerList = data => request.post('/customer/customerList', data, false)

// 经纪人
export const agentList = data => request.post('/agent/agentList', data, false)

// 广告列表
export const advertisementList = data => request.post('/advertisement/advertisementList', data, false)

// 商品广告位
export const goodsAdvertisementList = data => request.post('goodsAdvertisement/goodsAdvertisementList', data, false)

// 红人推荐列表
export const sensationRecommend = data => request.post('/sensationRecommend/sensationRecommendList', data, false)

// 省列表
export const provinceList = data => request.post('/address/provinceList', data, false)

// 市列表
export const cityList = data => request.post('/address/cityList', data, false)

// 区列表
export const areaList = data => request.post('/address/areaList', data, false)

// 返佣推荐商品列表
export const commissionRecommendList = data => request.post('/commissionRecommend/commissionRecommendList', data, false)

// 底部返佣推荐商品列表
export const bottomCommissionRecommendList = data => request.post('/bottomCommissionRecommend/bottomCommissionRecommendList', data, false)

// 拿货推荐商品列表
export const takeDeliveryRecommendList = data => request.post('/takeDeliveryRecommend/takeDeliveryRecommendList', data, false)

// 常见问题配置列表
export const problemList = data => request.post('/problem/problemList', data, false)

// 快递公司列表
export const expressList = data => request.post('/express/expressList', data, false)

// 首页搜索商品
export const goodsList = data => request.post('/goods/goodsList', data, false)

// 返佣商品列表
export const commissionGoodsList = data => request.post('/goods/commissionGoodsList', data, false)

// 返佣商品搜索列表
export const commissionGoodsSearchList = data => request.post('/goods/commissionGoodsSearchList', data, false)

// 返佣商品详情
export const commissionGoodsInfo = data => request.post('/goods/commissionGoodsInfo', data, false)

// 拿货商品列表
export const takeDeliveryGoodsList = data => request.post('/goods/takeDeliveryGoodsList', data, false)

// 拿货商品搜索列表
export const takeDeliveryGoodsSearchList = data => request.post('/goods/takeDeliveryGoodsSearchList', data, false)

// 拿货商品详情
export const takeDeliveryGoodsInfo = data => request.post('/goods/takeDeliveryGoodsInfo', data, false)

// 品牌馆返佣商品列表
export const brandCommissionGoodsList = data => request.post('/goods/brandCommissionGoodsList', data, false)

// 品牌馆拿货商品列表
export const brandTakeDeliveryGoodsList = data => request.post('/goods/brandTakeDeliveryGoodsList', data, false)

// 商品分类列表
export const goodsTypeConfigList = data => request.post('/goodsTypeConfig/goodsTypeConfigList', data, false)

// 注册
export const register = data => request.post('/sensationLogin/register', data, false)

// 红人账号密码登录
export const passwordLogin = data => request.post('/sensationLogin/passwordLogin', data, false)

// 红人账号验证码登录
export const codeLogin = data => request.post('/sensationLogin/codeLogin', data, false)

// 退出登录
export const sensationLoginOut = data => request.post('/sensationLogin/loginOut', data, false)

// 找回密码
export const updatePassword = data => request.post('/sensation/updatePassword', data, false)

// 获取红人详情
export const sensationInfo = data => request.post('/sensation/sensationInfo', data, false)

// 完善和修改红人个人资料
export const updateSensation = data => request.post('/sensation/updateSensation', data, false)

// 获取红人认证详情
export const sensationAttestationInfo = data => request.post('/sensation/sensationAttestationInfo', data, false)

// 红人认证
export const updateSensationAttestation = data => request.post('/sensation/updateSensationAttestation', data, false)

// 红人列表
export const sensationList = data => request.post('/sensation/sensationList', data, false)

// 红人搜索列表
export const sensationSearchList = data => request.post('/sensation/sensationSearchList', data, false)

// 红人详情
export const sensationDetails = data => request.post('/sensation/sensationDetails', data, false)

// 红人金额
export const sensationPrice = data => request.post('/sensation/sensationPrice', data, false)

// 红人提现明细列表
export const sensationWithdrawInfoList = data => request.post('/sensationWithdrawInfo/sensationWithdrawInfoList', data, false)

// 红人提现
export const sensationWithdraw = data => request.post('/sensationWithdrawInfo/sensationManualWithdraw', data, false)

// 红人收入明细列表
export const sensationIncomeList = data => request.post('/sensationIncome/sensationIncomeList', data, false)

// 获取淘宝客授权链接
export const getTaoBaoUrl = data => request.post('/taoBaoTbk/getTaoBaoUrl', data, false)

// 取样列表
export const orderList = data => request.post('/order/orderList', data, false)

// 取样详情
export const orderInfo = data => request.post('/order/orderInfo', data, false)

// 获取取样信息
export const getOrderInfo = data => request.post('/order/getOrderInfo', data, false)

// 确认取样
export const addOrder = data => request.post('/order/addOrder', data, false)

// 红人确认收样
export const receivingOrder = data => request.post('/order/receivingOrder', data, false)

// 红人寄回样
export const sendOrder = data => request.post('/order/sendOrder', data, false)
