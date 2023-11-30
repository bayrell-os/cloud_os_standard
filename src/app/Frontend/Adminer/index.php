<div>
    <div>Redirect. Please wait...</div>
	 <form id="adminer_form" method="POST" action="/settings/database/adminer/" enctype="multipart/form-data">
        <input type='hidden' name='auth[driver]' value='sqlite' />
        <input type='hidden' name='auth[username]' value='admin' />
        <input type='hidden' name='auth[password]' value='admin' />
        <input type='hidden' name='auth[db]' value='/data/db/cloud_os.db' />
        <input type='hidden' name='auth[permanent]' value='1' />
        <button>Value</button>
    </form>
	<!--
    <form id="adminer_form" method="POST" action="/api/database/adminer/" enctype="multipart/form-data">
        <input type='hidden' name='auth[driver]' value='server' />
        <input type='hidden' name='auth[server]' value='{{ host }}' />
        <input type='hidden' name='auth[username]' value='{{ username }}' />
        <input type='hidden' name='auth[password]' value='{{ password }}' />
        <input type='hidden' name='auth[permanent]' value='1' />
        <button>Value</button>
    </form>
	-->
</div>
<script>
    adminer_form.submit();
</script>