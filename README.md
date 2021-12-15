# @r14c/async-utils(1) -- async implementations of common utility functions

**don't block**

`async-utils` is designed to work with the new async syntax to allow you to write non-blocking
code that looks synchronous. functions like `Array.prototype.map()` are very useful, but
operating over large collections will always block. `async-utils` rethinks a full range of
useful tools to work *with* the event loop rather than against it.

contributors welcome! please [email a patch or pull request](https://git-send-email.io/) to a
maintainer and we'll get your changes merged as quickly as possible.

## Modules

<dl>
<dt><a href="#module_fork">fork</a></dt>
<dd></dd>
<dt><a href="#module_microTask">microTask</a></dt>
<dd></dd>
<dt><a href="#module_to">to</a></dt>
<dd></dd>
</dl>

## Functions

<dl>
<dt><a href="#exp_module_fork--fork">fork(fns, predicate)</a> ⇒ <code>Promise.&lt;any&gt;</code> ⏏</dt>
<dd><p>execute a chain of async operations using the return value of each function
as the argument for the next</p>
</dd>
<dt><a href="#checksum">checksum()</a> ⇒</dt>
<dd></dd>
<dt><a href="#isPromise">isPromise(value)</a> ⇒ <code>boolean</code></dt>
<dd></dd>
<dt><a href="#getItem">getItem(key, cacheGroup)</a></dt>
<dd></dd>
<dt><a href="#evictItem">evictItem(key, cacheGroup)</a></dt>
<dd></dd>
<dt><a href="#setItem">setItem()</a></dt>
<dd><p>if the memoized function returns a promise, we need some special treatment so
we don&#39;t cache rejections</p>
</dd>
<dt><a href="#setEvictItemTimer">setEvictItemTimer()</a></dt>
<dd></dd>
<dt><a href="#getKey">getKey(identity, fn, args)</a></dt>
<dd></dd>
<dt><a href="#memoize">memoize(fn, args, ttl)</a></dt>
<dd></dd>
<dt><a href="#exp_module_microTask--microTask">microTask(fn)</a> ⏏</dt>
<dd><p>schedule a task to run on nextTick</p>
</dd>
<dt><a href="#exp_module_to--to">to(promise)</a> ⇒ <code>Promise</code> ⏏</dt>
<dd></dd>
</dl>

<a name="module_fork"></a>

## fork
<a name="exp_module_fork--fork"></a>

### fork(fns, predicate) ⇒ <code>Promise.&lt;any&gt;</code> ⏏
execute a chain of async operations using the return value of each function
as the argument for the next

**Kind**: global method of [<code>fork</code>](#module_fork)  

| Param | Type |
| --- | --- |
| fns | <code>Array.&lt;function(value)&gt;</code> | 
| predicate | <code>any</code> | 

<a name="module_microTask"></a>

## microTask
<a name="exp_module_microTask--microTask"></a>

### microTask(fn) ⏏
schedule a task to run on nextTick

**Kind**: global method of [<code>microTask</code>](#module_microTask)  

| Param | Type |
| --- | --- |
| fn | <code>function</code> | 

<a name="module_to"></a>

## to
<a name="exp_module_to--to"></a>

### to(promise) ⇒ <code>Promise</code> ⏏
**Kind**: global method of [<code>to</code>](#module_to)  

| Param | Type |
| --- | --- |
| promise | <code>Promise</code> | 

<a name="checksum"></a>

## checksum() ⇒
**Kind**: global function  
**Returns**: string  
<a name="isPromise"></a>

## isPromise(value) ⇒ <code>boolean</code>
**Kind**: global function  

| Param | Type |
| --- | --- |
| value | <code>\*</code> | 

<a name="getItem"></a>

## getItem(key, cacheGroup)
**Kind**: global function  

| Param | Type |
| --- | --- |
| key | <code>string</code> | 
| cacheGroup | <code>string</code> | 

<a name="evictItem"></a>

## evictItem(key, cacheGroup)
**Kind**: global function  

| Param | Type |
| --- | --- |
| key | <code>string</code> | 
| cacheGroup | <code>string</code> | 

<a name="setItem"></a>

## setItem()
if the memoized function returns a promise, we need some special treatment so
we don't cache rejections

**Kind**: global function  
<a name="setEvictItemTimer"></a>

## setEvictItemTimer()
**Kind**: global function  
<a name="getKey"></a>

## getKey(identity, fn, args)
**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| identity | <code>function</code> | returns a unique key for each input |
| fn | <code>function</code> |  |
| args | <code>array</code> |  |

<a name="memoize"></a>

## memoize(fn, args, ttl)
**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| fn | <code>function</code> | the function that is being memoized |
| args | <code>array</code> | arguments that should be passed into fn |
| ttl | <code>number</code> \| <code>Object</code> | time to live value and cache group |

<a name="memoize.clear"></a>

### memoize.clear(cacheGroup)
evict a group of cached objects

**Kind**: static method of [<code>memoize</code>](#memoize)  

| Param | Type |
| --- | --- |
| cacheGroup | <code>string</code> | 

