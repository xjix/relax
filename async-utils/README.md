# @relax/async-utils(1) -- async implementations of common utility functions

**don't block**

`async-utils` is designed to work with the new async syntax to allow you to write non-blocking
code that looks synchronous. functions like `Array.prototype.map()` are very useful, but
operating over large collections will always block. `async-utils` rethinks a full range of
useful tools to work *with* the event loop rather than against it.

contributors welcome! please [email a patch or pull request](https://git-send-email.io/) to a
maintainer and we'll get your changes merged as quickly as possible.

## Modules

<dl>
<dt><a href="#module_checksum">checksum</a></dt>
<dd></dd>
<dt><a href="#module_forEach">forEach</a></dt>
<dd></dd>
<dt><a href="#module_matchCase">matchCase</a></dt>
<dd></dd>
<dt><a href="#module_memoize">memoize</a></dt>
<dd></dd>
<dt><a href="#module_microTask">microTask</a></dt>
<dd></dd>
<dt><a href="#module_pipe">pipe</a></dt>
<dd></dd>
<dt><a href="#module_Queue">Queue</a></dt>
<dd></dd>
<dt><a href="#module_to">to</a></dt>
<dd></dd>
</dl>

## Classes

<dl>
<dt><a href="#exp_module_Queue--Queue">Queue</a> ⏏</dt>
<dd></dd>
</dl>

## Functions

<dl>
<dt><a href="#exp_module_checksum--checksum">checksum(...input)</a> ⇒ <code>string</code> ⏏</dt>
<dd><p>compute a the checksum of a javascript object.</p></dd>
<dt><a href="#exp_module_forEach--forEach">forEach(collection, fn)</a> ⏏</dt>
<dd></dd>
<dt><a href="#exp_module_map--map">map(collection, fn)</a> ⏏</dt>
<dd></dd>
<dt><a href="#exp_module_matchCase--matchCase">matchCase()</a> ⏏</dt>
<dd><p>type-directed pattern matching. compares input with the given types via
<code>instanceof</code>.</p>
<pre class="prettyprint source"><code>const [err, result] = await to(myAsyncFn())
cosnt returnValue = matchCase(err,
  [TypeError, () => {
    // handle TypeError
  }],
  [HttpError, () => {
    // handle HttpError
  }],
  () => {
    // ifNoneMatch, handle result
  }
)
</code></pre></dd>
<dt><a href="#exp_module_memoize--Memoize">Memoize([identity])</a> ⇒ <code>function</code> ⏏</dt>
<dd><p>cache namespace cosntructor
the passed <code>identity</code> function is used to track which function made a
particular call so it can be associated with the cache. by default, memoize
uses the included checksum function.</p></dd>
<dt><a href="#exp_module_microTask--microTask">microTask(fn)</a> ⏏</dt>
<dd><p>schedule a task to run on nextTick</p></dd>
<dt><a href="#exp_module_pipe--pipe">pipe(predicate, fns)</a> ⇒ <code>Promise.&lt;any&gt;</code> ⏏</dt>
<dd><p>execute a chain of async operations using the return value of each function
as the argument for the next</p></dd>
<dt><a href="#exp_module_to--to">to()</a> ⏏</dt>
<dd><p>simplify error checking for async processes. promotes shorter code with
explicit error handling up front.</p>
<pre class="prettyprint source"><code>const [err, result] = await to(myAsyncFn())
if (err) {
  // handle error
} else {
  // happy path
}
</code></pre>
<p>compared to the usual try..catch approach. these are simple contrived
examples, but in complex async processes the resulting code is typically
more linear, with less nested branches compared to the typical approach.
we give up the narrow error handling scope and handling errors is always
deferred until later by the grammar.</p>
<pre class="prettyprint source"><code>try {
  const result = await myAsyncFn()
  // happy path
} catch (err) {
  // handle error
}
</code></pre></dd>
</dl>

<a name="module_checksum"></a>

## checksum
<a name="exp_module_checksum--checksum"></a>

### checksum(...input) ⇒ <code>string</code> ⏏
<p>compute a the checksum of a javascript object.</p>

**Kind**: global method of [<code>checksum</code>](#module_checksum)  

| Param | Type | Description |
| --- | --- | --- |
| ...input | <code>\*</code> | <p>any javascript object</p> |

<a name="module_forEach"></a>

## forEach
<a name="exp_module_forEach--forEach"></a>

### forEach(collection, fn) ⏏
**Kind**: global method of [<code>forEach</code>](#module_forEach)  

| Param | Type |
| --- | --- |
| collection | <code>array</code> | 
| fn | <code>function</code> | 

<a name="module_matchCase"></a>

## matchCase
<a name="exp_module_matchCase--matchCase"></a>

### matchCase() ⏏
<p>type-directed pattern matching. compares input with the given types via
<code>instanceof</code>.</p>
<pre class="prettyprint source"><code>const [err, result] = await to(myAsyncFn())
cosnt returnValue = matchCase(err,
  [TypeError, () => {
    // handle TypeError
  }],
  [HttpError, () => {
    // handle HttpError
  }],
  () => {
    // ifNoneMatch, handle result
  }
)
</code></pre>

**Kind**: global method of [<code>matchCase</code>](#module_matchCase)  
<a name="module_memoize"></a>

## memoize

* [memoize](#module_memoize)
    * [Memoize([identity])](#exp_module_memoize--Memoize) ⇒ <code>function</code> ⏏
        * [~memoize(fn, args, ttl)](#module_memoize--Memoize..memoize)
            * [.clear(cacheGroup)](#module_memoize--Memoize..memoize.clear)

<a name="exp_module_memoize--Memoize"></a>

### Memoize([identity]) ⇒ <code>function</code> ⏏
<p>cache namespace cosntructor
the passed <code>identity</code> function is used to track which function made a
particular call so it can be associated with the cache. by default, memoize
uses the included checksum function.</p>

**Kind**: global method of [<code>memoize</code>](#module_memoize)  
**Returns**: <code>function</code> - <p>cache instance</p>  
**See**: [checksum](#module_checksum)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [identity] | <code>function</code> | <code></code> | <p>optional identity function</p> |

<a name="module_memoize--Memoize..memoize"></a>

#### Memoize~memoize(fn, args, ttl)
<p>cache the result of a function call in memory.</p>

**Kind**: inner method of [<code>Memoize</code>](#exp_module_memoize--Memoize)  

| Param | Type | Description |
| --- | --- | --- |
| fn | <code>function</code> | <p>the function that is being memoized</p> |
| args | <code>array</code> | <p>arguments that should be passed into fn</p> |
| ttl | <code>number</code> \| <code>Object</code> | <p>time to live value and cache group</p> |

<a name="module_memoize--Memoize..memoize.clear"></a>

##### memoize.clear(cacheGroup)
<p>evict a group of cached objects</p>

**Kind**: static method of [<code>memoize</code>](#module_memoize--Memoize..memoize)  

| Param | Type |
| --- | --- |
| cacheGroup | <code>string</code> | 

<a name="module_microTask"></a>

## microTask
<a name="exp_module_microTask--microTask"></a>

### microTask(fn) ⏏
<p>schedule a task to run on nextTick</p>

**Kind**: global method of [<code>microTask</code>](#module_microTask)  

| Param | Type |
| --- | --- |
| fn | <code>function</code> | 

<a name="module_pipe"></a>

## pipe
<a name="exp_module_pipe--pipe"></a>

### pipe(predicate, fns) ⇒ <code>Promise.&lt;any&gt;</code> ⏏
<p>execute a chain of async operations using the return value of each function
as the argument for the next</p>

**Kind**: global method of [<code>pipe</code>](#module_pipe)  

| Param | Type |
| --- | --- |
| predicate | <code>any</code> | 
| fns | <code>Array.&lt;function(value)&gt;</code> | 

<a name="module_Queue"></a>

## Queue
<a name="exp_module_Queue--Queue"></a>

### Queue ⏏
**Kind**: global class of [<code>Queue</code>](#module_Queue)  
<a name="module_to"></a>

## to
<a name="exp_module_to--to"></a>

### to() ⏏
<p>simplify error checking for async processes. promotes shorter code with
explicit error handling up front.</p>
<pre class="prettyprint source"><code>const [err, result] = await to(myAsyncFn())
if (err) {
  // handle error
} else {
  // happy path
}
</code></pre>
<p>compared to the usual try..catch approach. these are simple contrived
examples, but in complex async processes the resulting code is typically
more linear, with less nested branches compared to the typical approach.
we give up the narrow error handling scope and handling errors is always
deferred until later by the grammar.</p>
<pre class="prettyprint source"><code>try {
  const result = await myAsyncFn()
  // happy path
} catch (err) {
  // handle error
}
</code></pre>

**Kind**: global method of [<code>to</code>](#module_to)  
**See**: module:matchCase  
