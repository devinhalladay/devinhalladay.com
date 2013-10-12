opts = {
  :access_key_id     => 'AKIAJEITHSKEFIG6SZQQ',
  :secret_access_key => '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',
  :bucket            => 'devinhalladay',
  :s3_permissions    => :public_read
}

guard 's3', opts do
  watch(%r{^public/.*})
end