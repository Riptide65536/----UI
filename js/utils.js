/**
 * 通用工具模块
 * 包含Toast提示、加载指示器等通用功能
 */

// Toast提示持续时间（毫秒）
const TOAST_DURATION = 2000;

/**
 * 显示Toast提示
 * @param {string} message - 提示消息
 * @param {string} type - 提示类型（info, success, error, warning）
 * @param {number} duration - 显示持续时间（毫秒）
 */
function showToast(message, type = 'info', duration = TOAST_DURATION) {
    // 检查是否已存在Toast容器
    let toastContainer = document.getElementById('toastContainer');

    if (!toastContainer) {
        // 创建Toast容器
        toastContainer = document.createElement('div');
        toastContainer.id = 'toastContainer';
        toastContainer.className = 'toast-container';
        document.body.appendChild(toastContainer);
    }

    // 创建新的Toast元素
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;

    // 添加到容器中
    toastContainer.appendChild(toast);

    // 显示Toast
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);

    // 设置自动消失
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            toastContainer.removeChild(toast);
            // 如果容器中没有更多Toast，则移除容器
            if (toastContainer.children.length === 0) {
                document.body.removeChild(toastContainer);
            }
        }, 300); // 等待淡出动画完成
    }, duration);
}

/**
 * 显示加载指示器
 * @param {string} message - 加载提示消息
 * @returns {HTMLElement} - 加载指示器元素
 */
function showLoading(message = '加载中...') {
    // 检查是否已存在加载指示器
    let loadingElement = document.getElementById('globalLoading');

    if (!loadingElement) {
        // 创建加载指示器
        loadingElement = document.createElement('div');
        loadingElement.id = 'globalLoading';
        loadingElement.className = 'loading-container';

        const spinner = document.createElement('div');
        spinner.className = 'loading-spinner';
        loadingElement.appendChild(spinner);

        const loadingText = document.createElement('div');
        loadingText.className = 'loading-text';
        loadingText.textContent = message;
        loadingElement.appendChild(loadingText);

        document.body.appendChild(loadingElement);
    } else {
        // 更新现有加载指示器的消息
        const loadingText = loadingElement.querySelector('.loading-text');
        if (loadingText) {
            loadingText.textContent = message;
        }
    }

    return loadingElement;
}

/**
 * 隐藏加载指示器
 */
function hideLoading() {
    const loadingElement = document.getElementById('globalLoading');
    if (loadingElement) {
        document.body.removeChild(loadingElement);
    }
}

/**
 * 防抖函数
 * @param {Function} func - 要执行的函数
 * @param {number} wait - 等待时间（毫秒）
 * @returns {Function} - 防抖处理后的函数
 */
function debounce(func, wait = 300) {
    let timeout;
    return function (...args) {
        const context = this;
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            func.apply(context, args);
        }, wait);
    };
}

/**
 * 节流函数
 * @param {Function} func - 要执行的函数
 * @param {number} limit - 时间限制（毫秒）
 * @returns {Function} - 节流处理后的函数
 */
function throttle(func, limit = 300) {
    let inThrottle;
    return function (...args) {
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/**
 * 格式化日期
 * @param {Date|string|number} date - 日期对象、日期字符串或时间戳
 * @param {string} format - 格式化模板
 * @returns {string} - 格式化后的日期字符串
 */
function formatDate(date, format = 'YYYY-MM-DD') {
    const d = new Date(date);
    if (isNaN(d.getTime())) {
        return '';
    }

    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    const seconds = String(d.getSeconds()).padStart(2, '0');

    return format
        .replace('YYYY', year)
        .replace('MM', month)
        .replace('DD', day)
        .replace('HH', hours)
        .replace('mm', minutes)
        .replace('ss', seconds);
}

/**
 * 阻止默认事件并停止传播
 * @param {Event} e - 事件对象
 */
function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
}

/**
 * 生成唯一ID
 * @returns {string} - 唯一ID
 */
function generateUniqueId() {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

/**
 * 深度克隆对象
 * @param {Object} obj - 要克隆的对象
 * @returns {Object} - 克隆后的对象
 */
function deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
}

/**
 * 创建HTML元素
 * @param {string} tag - 元素标签
 * @param {Object} attributes - 元素属性
 * @param {string|HTMLElement} content - 元素内容
 * @returns {HTMLElement} - 创建的元素
 */
function createElement(tag, attributes = {}, content = '') {
    const element = document.createElement(tag);

    // 设置属性
    Object.keys(attributes).forEach(key => {
        element.setAttribute(key, attributes[key]);
    });

    // 设置内容
    if (typeof content === 'string') {
        element.innerHTML = content;
    } else if (content instanceof HTMLElement) {
        element.appendChild(content);
    }

    return element;
}

/**
 * 将Data URL转换为Blob
 * @param {string} dataURL - Data URL
 * @returns {Blob} - Blob对象
 */
function dataURLtoBlob(dataURL) {
    const arr = dataURL.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }

    return new Blob([u8arr], { type: mime });
}

/**
 * 将Blob转换为Data URL
 * @param {Blob} blob - Blob对象
 * @returns {Promise<string>} - 返回Promise，解析为Data URL
 */
function blobToDataURL(blob) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
}

/**
 * 通用图片处理功能
 * 提供图片压缩、存储、加载等功能
 */

// 图片存储键
const IMAGE_STORAGE_KEYS = ['uploadedImages', 'productImages', 'uploadedFiles'];

/**
 * 保存图片到localStorage
 * @param {Array} images - 图片数组
 * @param {string} key - 存储键名，默认为uploadedImages
 */
function saveImagesToStorage(images, key = 'uploadedImages') {
    if (!images || !Array.isArray(images)) return;

    try {
        localStorage.setItem(key, JSON.stringify(images));
        console.log(`已保存${images.length}张图片到${key}`);
    } catch (error) {
        console.error('保存图片失败:', error);
    }
}

/**
 * 从localStorage加载图片
 * @param {string|Array} keys - 存储键名或键名数组
 * @returns {Array} 图片数组
 */
function loadImagesFromStorage(keys = IMAGE_STORAGE_KEYS) {
    let images = [];
    const keysToCheck = Array.isArray(keys) ? keys : [keys];

    for (const key of keysToCheck) {
        try {
            const storedData = localStorage.getItem(key);
            if (storedData) {
                const parsedData = JSON.parse(storedData);

                if (Array.isArray(parsedData) && parsedData.length > 0) {
                    console.log(`从${key}加载了${parsedData.length}张图片`);
                    images = parsedData;
                    break;
                } else if (typeof parsedData === 'object' && parsedData !== null) {
                    // 对象格式，尝试提取URLs
                    const extractedImages = Object.values(parsedData).filter(item =>
                        typeof item === 'string' ||
                        (item && (item.url || item.preview || item.src))
                    );

                    if (extractedImages.length > 0) {
                        console.log(`从${key}对象中提取了${extractedImages.length}张图片`);
                        images = extractedImages;
                        break;
                    }
                }
            }
        } catch (error) {
            console.error(`从${key}加载图片失败:`, error);
        }
    }

    return images;
}

/**
 * 获取图片源URL（处理不同格式的图片数据）
 * @param {string|object} img - 图片数据
 * @returns {string} 图片URL
 */
function getImageSource(img) {
    if (!img) return "";

    // 如果是字符串（直接URL），返回
    if (typeof img === 'string') {
        return img;
    }
    // 如果是File对象，尝试创建objectURL
    else if (typeof File !== 'undefined' && img instanceof File) {
        return URL.createObjectURL(img);
    }
    // 如果是对象，尝试获取URL属性
    else if (typeof img === 'object') {
        // 检查各种可能的URL属性
        if (img.preview) return img.preview;
        if (img.url) return img.url;
        if (img.src) return img.src;
        if (img.path) return img.path;
        if (img.uri) return img.uri;

        // 如果有base64数据
        if (img.data && typeof img.data === 'string' &&
            (img.data.startsWith('data:image') || img.data.startsWith('http'))) {
            return img.data;
        }

        // 如果有objectURL
        if (img.objectURL) return img.objectURL;
    }

    console.warn('无法提取图片URL:', img);
    return "";
}

/**
 * 压缩图片
 * @param {string} imageUrl - 图片URL
 * @param {string} mimeType - MIME类型
 * @param {Function} callback - 回调函数
 */
function compressImage(imageUrl, mimeType, callback) {
    const img = new Image();
    img.src = imageUrl;

    img.onload = function () {
        let width = img.width;
        let height = img.height;

        // 计算压缩比例
        const maxDimension = 1200;
        if (width > maxDimension || height > maxDimension) {
            if (width > height) {
                height = Math.round(height * (maxDimension / width));
                width = maxDimension;
            } else {
                width = Math.round(width * (maxDimension / height));
                height = maxDimension;
            }
        }

        // 创建Canvas
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');

        // 设置Canvas尺寸
        canvas.width = width;
        canvas.height = height;

        // 绘制图片到Canvas
        context.drawImage(img, 0, 0, width, height);

        // 获取压缩后的图片数据
        const compressedImageUrl = canvas.toDataURL(mimeType || 'image/jpeg', 0.8);

        // 返回压缩后的图片
        callback(compressedImageUrl);
    };
}

// 导出函数，使其可以在其他脚本中访问
window.saveImagesToStorage = saveImagesToStorage;
window.loadImagesFromStorage = loadImagesFromStorage;
window.getImageSource = getImageSource;
window.compressImage = compressImage;

// 导出工具函数
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        showToast,
        showLoading,
        hideLoading,
        debounce,
        throttle,
        formatDate,
        preventDefaults,
        generateUniqueId,
        deepClone,
        createElement,
        dataURLtoBlob,
        blobToDataURL
    };
} else {
    // 添加到全局对象
    window.utils = {
        showToast,
        showLoading,
        hideLoading,
        debounce,
        throttle,
        formatDate,
        preventDefaults,
        generateUniqueId,
        deepClone,
        createElement,
        dataURLtoBlob,
        blobToDataURL
    };
} 