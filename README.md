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
<dt><a href="#module_memoize">memoize</a></dt>
<dd></dd>
<dt><a href="#module_microTask">microTask</a></dt>
<dd></dd>
<dt><a href="#module_to">to</a></dt>
<dd></dd>
</dl>

## Functions

<dl>
<dt><a href="#exp_module_checksum--checksum">checksum(...obj)</a> ⇒ ⏏</dt>
<dd><p>compute a the checksum of a javascript object.</p>
</dd>
<dt><a href="#exp_module_fork--fork">fork(fns, predicate)</a> ⇒ <code>Promise.&lt;any&gt;</code> ⏏</dt>
<dd><p>execute a chain of async operations using the return value of each function
as the argument for the next</p>
</dd>
<dt><a href="#exp_module_memoize--Memoize">Memoize([identity])</a> ⏏</dt>
<dd><p>cache namespace cosntructor
the passed <code>identity</code> function is used to track which function made a
particular call so it can be associated with the cache. by default, memoize
uses the included checksum function.</p>
</dd>
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

<a name="module_memoize"></a>

## memoize

* [memoize](#module_memoize)
    * [Memoize([identity])](#exp_module_memoize--Memoize) ⏏
        * [~memoize(fn, args, ttl)](#module_memoize--Memoize..memoize)
            * [.clear(cacheGroup)](#module_memoize--Memoize..memoize.clear)

<a name="exp_module_memoize--Memoize"></a>

### Memoize([identity]) ⏏
cache namespace cosntructor
the passed `identity` function is used to track which function made a
particular call so it can be associated with the cache. by default, memoize
uses the included checksum function.

**Kind**: global method of [<code>memoize</code>](#module_memoize)  
**See**: [checksum](#exp_module_checksum--checksum)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [identity] | <code>function</code> | <code></code> | optional identity function |

<a name="module_memoize--Memoize..memoize"></a>

#### Memoize~memoize(fn, args, ttl)
cache the result of a function call in memory.

**Kind**: inner method of [<code>Memoize</code>](#exp_module_memoize--Memoize)  

| Param | Type | Description |
| --- | --- | --- |
| fn | <code>function</code> | the function that is being memoized |
| args | <code>array</code> | arguments that should be passed into fn |
| ttl | <code>number</code> \| <code>Object</code> | time to live value and cache group |

<a name="module_memoize--Memoize..memoize.clear"></a>

##### memoize.clear(cacheGroup)
evict a group of cached objects

**Kind**: static method of [<code>memoize</code>](#module_memoize--Memoize..memoize)  

| Param | Type |
| --- | --- |
| cacheGroup | <code>string</code> | 

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

